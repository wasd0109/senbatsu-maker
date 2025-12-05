import { useSenbatsuStyle } from '@/contexts/SenbatsuStyleContext';

function FieldAdjustmentConfig() {
    const { selectedStyle, updateStyleProperty } = useSenbatsuStyle();

    const offset = selectedStyle.senbatsuFieldOffset || { x: 0, y: 0 };
    const scale = selectedStyle.senbatsuFieldScale || 1;
    const overlapGap = selectedStyle.senbatsuItemOverlapGap || { x: 25, y: 10 };

    return (
        <div className="p-3 bg-white rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold mb-3 text-gray-700 md:hidden">Field Adjustment</h3>

            {/* Mobile: Horizontal Layout */}
            <div className="">
                <div className="grid grid-cols-2 gap-3 mb-3">
                    {/* X Offset */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Senbatsu Field X position: {offset.x}px
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
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Senbatsu Field Y position: {offset.y}px
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
                    <div>
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

                    {/* Item Shape Toggle */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Item Shape
                        </label>
                        <button
                            onClick={() => {
                                const newShape = selectedStyle.senbatsuItemShape === 'rectangular' ? 'circular' : 'rectangular';
                                updateStyleProperty('senbatsuItemShape', newShape);
                            }}
                            className="w-full px-3 py-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors font-medium"
                        >
                            {selectedStyle.senbatsuItemShape === 'rectangular' ? '□ Rectangle' : '○ Rounded'}
                        </button>
                    </div>

                    {/* Overlap Gap Controls*/}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Overlap X: {overlapGap.x}px
                        </label>
                        <input
                            type="range"
                            min="-50"
                            max="50"
                            value={overlapGap.x}
                            onChange={(e) => {
                                const newX = parseInt(e.target.value);
                                updateStyleProperty('senbatsuItemOverlapGap', { ...overlapGap, x: newX });
                            }}
                            className="w-full h-1"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Overlap Y: {overlapGap.y}px
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
                </div>

                {/* Reset Button */}
                <button
                    onClick={() => {
                        updateStyleProperty('senbatsuFieldOffset', { x: 0, y: 0 });
                        updateStyleProperty('senbatsuFieldScale', 1);
                        updateStyleProperty('senbatsuFieldStaggerEnabled', true);
                        updateStyleProperty('senbatsuItemOverlapGap', { x: 25, y: 10 });
                    }}
                    className="w-full px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}

export default FieldAdjustmentConfig;
