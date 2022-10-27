import ReportItem from "../../core/reportItem";
import ReportItemSelector from "./reportItemSelector";

const NORMALIZE_POINT_TOLERANCE_PX = 3;

export interface NormalizeEdges {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

export function normalizePoints(
  edges: NormalizeEdges,
  selector: ReportItemSelector,
  items: ReportItem[],
) {
  const isMoving = edges.left && edges.right && edges.top && edges.bottom;

  const normalizedPoints = {
    left: selector.newLocation.x,
    top: selector.newLocation.y,
    right: selector.newLocation.x + selector.newSize.width,
    bottom: selector.newLocation.y + selector.newSize.height,
  };

  items.forEach((item) => {
    const left = item.properties.x;
    const right = left + item.properties.width;
    const top = item.properties.y;
    const bottom = top + item.properties.height;

    // TOP
    // Item Top
    if (
      edges.top &&
      Math.abs(normalizedPoints.top - top) <= NORMALIZE_POINT_TOLERANCE_PX
    ) {
      normalizedPoints.top = top;

      if (isMoving) {
        normalizedPoints.bottom = top + selector.newSize.height;
      }
    }

    // Item Bottom
    if (
      edges.top &&
      Math.abs(normalizedPoints.top - bottom) <= NORMALIZE_POINT_TOLERANCE_PX
    ) {
      normalizedPoints.top = bottom;

      if (isMoving) {
        normalizedPoints.bottom = bottom + selector.newSize.height;
      }
    }

    // BOTTOM
    // Item Bottom
    if (
      edges.bottom &&
      Math.abs(normalizedPoints.bottom - bottom) <= NORMALIZE_POINT_TOLERANCE_PX
    ) {
      normalizedPoints.bottom = bottom;

      if (isMoving) {
        normalizedPoints.top = bottom - selector.newSize.height;
      }
    }

    // Item Top
    if (
      edges.bottom &&
      Math.abs(normalizedPoints.bottom - top) <= NORMALIZE_POINT_TOLERANCE_PX
    ) {
      normalizedPoints.bottom = top;

      if (isMoving) {
        normalizedPoints.top = top - selector.newSize.height;
      }
    }

    // LEFT
    // Item Left
    if (
      edges.left &&
      Math.abs(normalizedPoints.left - left) <= NORMALIZE_POINT_TOLERANCE_PX
    ) {
      normalizedPoints.left = left;

      if (isMoving) {
        normalizedPoints.right = left + selector.newSize.width;
      }
    }

    // Item Right
    if (
      edges.left &&
      Math.abs(normalizedPoints.left - right) <= NORMALIZE_POINT_TOLERANCE_PX
    ) {
      normalizedPoints.left = right;

      if (isMoving) {
        normalizedPoints.right = right + selector.newSize.width;
      }
    }

    // RIGHT
    // Item Right
    if (
      edges.right &&
      Math.abs(normalizedPoints.right - right) <= NORMALIZE_POINT_TOLERANCE_PX
    ) {
      normalizedPoints.right = right;

      if (isMoving) {
        normalizedPoints.left = right - selector.newSize.width;
      }
    }

    // Item Left
    if (
      edges.right &&
      Math.abs(normalizedPoints.right - left) <= NORMALIZE_POINT_TOLERANCE_PX
    ) {
      normalizedPoints.right = left;

      if (isMoving) {
        normalizedPoints.left = left - selector.newSize.width;
      }
    }
  });

  return normalizedPoints;
}
