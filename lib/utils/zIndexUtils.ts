/**
 * Calculate z-index for a senbatsu item based on its position in the grid
 * Rules:
 * 1. Bottom rows have higher z-index than top rows
 * 2. Items closer to the middle column have higher z-index
 *
 * @param rowIndex - The row index of the item (0-based)
 * @param colIndex - The column index of the item (0-based)
 * @param totalRows - Total number of rows in the grid
 * @param totalCols - Total number of columns in the grid
 * @returns The calculated z-index value
 */
export function calculateZIndex(
  rowIndex: number,
  colIndex: number,
  totalRows: number,
  totalCols: number
): number {
  // Base z-index for rows (higher row number = higher z-index)
  // Multiply by a large number to ensure row priority is maintained
  const rowZIndex = rowIndex * 100;

  // Calculate distance from middle column
  const middleCol = (totalCols - 1) / 2;
  const distanceFromMiddle = Math.abs(colIndex - middleCol);
  // Invert distance so closer to middle = higher value
  // Subtract from total possible distance
  const maxDistance = Math.floor(totalCols / 2);
  const colZIndex = maxDistance - distanceFromMiddle;
  
  // Combine: row takes priority, column fine-tunes within same row
  return Math.ceil(rowZIndex + colZIndex);
}


/**
 * Alternative calculation that provides more granular z-index values
 * Uses a weighted approach where row priority is stronger
 *
 * @param rowIndex - The row index of the item (0-based)
 * @param colIndex - The column index of the item (0-based)
 * @param totalRows - Total number of rows in the grid
 * @param totalCols - Total number of columns in the grid
 * @param rowWeight - Weight multiplier for row priority (default: 10)
 * @returns The calculated z-index value
 */
export function calculateWeightedZIndex(
  rowIndex: number,
  colIndex: number,
  totalRows: number,
  totalCols: number,
  rowWeight: number = 10
): number {
  // Calculate distance from middle column (normalized 0-1)
  const middleCol = (totalCols - 1) / 2;
  const distanceFromMiddle = Math.abs(colIndex - middleCol);
  const maxDistance = Math.ceil((totalCols - 1) / 2);
  const normalizedColScore = 1 - (distanceFromMiddle / maxDistance);

  // Combine with weighted row priority
  return (totalRows-rowIndex * rowWeight) + normalizedColScore;
}
