export function calculateCurrentPosition(current: number, removeStart: number, removeFinish: number): number {
  if (current < removeStart) {
    return current;
  }

  if (current > removeStart && current < removeFinish) {
    return Math.max(0, removeStart - 1);
  }

  return current - (removeFinish - removeStart);
}
