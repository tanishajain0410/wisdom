'use client';

import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Area, getCroppedImg } from '@/lib/cropImage';

interface ImageCropperModalProps {
  imageSrc: string;
  onCropCancel: () => void;
  onCropDone: (croppedUrl: string) => void;
}

export function ImageCropperModal({
  imageSrc,
  onCropCancel,
  onCropDone,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [saving, setSaving] = useState(false);

  const onCropChange = (newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  };

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, croppedAreaPixelsArea: Area) => {
      setCroppedAreaPixels(croppedAreaPixelsArea);
    },
    []
  );

  const handleApplyCrop = async () => {
    if (!croppedAreaPixels) return;

    setSaving(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);

      // Upload the cropped blob to /api/upload
      const formData = new FormData();
      formData.append('file', croppedBlob, `cropped_${Date.now()}.jpg`);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onCropDone(data.url);
      } else {
        alert(data.error || 'Failed to upload cropped image.');
      }
    } catch (err) {
      console.error(err);
      alert('Error cropping image.');
    } finally {
      setSaving(false);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md">
      <div className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl text-white max-h-[92vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="text-base">✂️</span>
            <div>
              <h3 className="font-display text-base font-black leading-none">Crop & Adjust Image</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Drag to reposition · Pinch or use slider to zoom
              </p>
            </div>
          </div>

          <button
            onClick={onCropCancel}
            disabled={saving}
            className="size-7 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white grid place-items-center text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Cropper Viewport */}
        <div className="relative h-64 w-full bg-black sm:h-72">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
          />
        </div>

        {/* Controls Bar */}
        <div className="space-y-3.5 px-5 py-4 bg-slate-900 border-t border-slate-800">
          {/* Aspect Ratio Buttons */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-slate-400">Ratio:</span>
            <div className="flex items-center gap-1.5">
              {[
                { label: '4:3 (Gallery)', val: 4 / 3 },
                { label: '16:9 (Wide)', val: 16 / 9 },
                { label: '1:1 (Square)', val: 1 },
                { label: 'Free', val: undefined },
              ].map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setAspect(r.val)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition ${
                    aspect === r.val
                      ? 'bg-amber-500 text-navy'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zoom Slider & Rotate */}
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2">
              <span className="text-xs text-slate-400">🔍</span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-700 accent-amber-500"
              />
              <span className="w-8 text-right text-[11px] font-bold text-slate-400">
                {zoom.toFixed(1)}x
              </span>
            </div>

            <button
              type="button"
              onClick={handleRotate}
              className="inline-flex items-center gap-1 rounded-lg bg-slate-800 px-3 py-1 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
              title="Rotate 90 degrees clockwise"
            >
              <span>🔄</span>
              <span>90°</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 border-t border-slate-800 px-5 py-3.5 bg-slate-950">
          <button
            type="button"
            disabled={saving}
            onClick={onCropCancel}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-300 hover:bg-slate-700 transition"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={handleApplyCrop}
            className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2 text-xs font-black text-navy shadow-lg transition hover:bg-amber-400 disabled:opacity-50"
          >
            {saving ? (
              <>
                <span className="size-3.5 animate-spin rounded-full border-2 border-navy border-t-transparent" />
                Processing Crop...
              </>
            ) : (
              'Crop & Use Photo ✓'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
