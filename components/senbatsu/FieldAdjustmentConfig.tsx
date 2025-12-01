import { useSenbatsuStyle } from '@/contexts/SenbatsuStyleContext';

function FieldAdjustmentConfig() {
    const { selectedStyle, updateStyleProperty } = useSenbatsuStyle();

    const offset = selectedStyle.senbatsuFieldOffset || { x: 0, y: 0 };
    const scale = selectedStyle.senbatsuFieldScale || 1;
    const overlapGap = selectedStyle.senbatsuItemOverlapGap || { x: 25, y: 10 };
    const hasOverlap = selectedStyle.senbatsuItemOverlap === true;
    const staggerEnabled = selectedStyle.senbatsuFieldStaggerEnabled ?? false;

    return (
        <div className="p-3 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold mb-3 text-gray-700">Field Adjustment</h3>

            {/* X Offset */}
            <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                    X Offset: {offset.x}px
                </label>
                <input
                    type="range"
                    min="-500"
                    max="500"
                    value={offset.x}
                    onChange={(e) => {
                        const newX = parseInt(e.target.value);
                        updateStyleProperty('senbatsuFieldOffset', { ...offset, x: newX });
                    }}
                    className="w-full h-1"
                />
            </div>

            {/* Y Offset */}
            <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                    Y Offset: {offset.y}px
                </label>
                <input
                    type="range"
                    min="-500"
                    max="500"
                    value={offset.y}
                    onChange={(e) => {
                        const newY = parseInt(e.target.value);
                        updateStyleProperty('senbatsuFieldOffset', { x: offset.x, y: newY });
                    }}
                    className="w-full h-1"
                />
            </div>

            {/* Scale */}
            <div className="mb-3">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                    Scale: {scale.toFixed(2)}
                </label>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.05"
                    value={scale}
                    onChange={(e) => {
                        const newScale = parseFloat(e.target.value);
                        updateStyleProperty('senbatsuFieldScale', newScale);
                    }}
                    className="w-full h-1"
                />
            </div>

            {/* Stagger Toggle */}
            <div className="mb-3">
                <label className="flex items-center gap-2 text-xs text-gray-600">
                    <input
                        type="checkbox"
                        checked={staggerEnabled}
                        onChange={(e) => updateStyleProperty('senbatsuFieldStaggerEnabled', e.target.checked)}
                        className="rounded"
                    />
                    Enable Row Staggering
                </label>
            </div>

            {/* Overlap Gap Controls - Only show if overlap is enabled */}
            {hasOverlap && (
                <>
                    <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Overlap Gap X: {overlapGap.x}px
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={overlapGap.x}
                            onChange={(e) => {
                                const newX = parseInt(e.target.value);
                                updateStyleProperty('senbatsuItemOverlapGap', { ...overlapGap, x: newX });
                            }}
                            className="w-full h-1"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Overlap Gap Y: {overlapGap.y}px
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={overlapGap.y}
                            onChange={(e) => {
                                const newY = parseInt(e.target.value);
                                updateStyleProperty('senbatsuItemOverlapGap', { x: overlapGap.x, y: newY });
                            }}
                            className="w-full h-1"
                        />
                    </div>
                </>
            )}

            {/* Reset Button */}
            <button
                onClick={() => {
                    updateStyleProperty('senbatsuFieldOffset', { x: 0, y: 0 });
                    updateStyleProperty('senbatsuFieldScale', 1);
                    updateStyleProperty('senbatsuFieldStaggerEnabled', true);
                    if (hasOverlap) {
                        updateStyleProperty('senbatsuItemOverlapGap', { x: 25, y: 10 });
                    }
                }}
                className="w-full px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
            >
                Reset to Default
            </button>
        </div>
    );
}

export default FieldAdjustmentConfig;
