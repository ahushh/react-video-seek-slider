import { useRef } from 'react';
import { getHoverTimePosition } from '../utils/getHoverTimePosition';
import { timeToTimeString } from '../utils/timeToTimeString';

interface Props {
  max: number;
  hoverTimeValue: number;
  trackWidth: number;
  seekHoverPosition: number;
  offset: number;
  isThumbActive: boolean;
  limitTimeTooltipBySides: boolean;
  label: string;
  secondsPrefix?: string;
  minutesPrefix?: string;
  getPreviewScreenUrl?: (hoverTimeValue: number) => string;
  PreviewScreenComponent?: React.FC<{ hoverTimeValue: number }>;
  showHoverTimeString?: boolean;
}

export const HoverTimeWithPreview: React.FC<Props> = ({
  max,
  hoverTimeValue,
  offset,
  trackWidth,
  seekHoverPosition,
  isThumbActive,
  limitTimeTooltipBySides,
  label,
  minutesPrefix,
  secondsPrefix,
  getPreviewScreenUrl,
  PreviewScreenComponent,
  showHoverTimeString,
}) => {
  if (PreviewScreenComponent && getPreviewScreenUrl) {
    throw new Error('You must specify getPreviewScreenUrl or getPreviewScreenComponent');
  }
  const hoverTimeElement = useRef<HTMLDivElement>(null);
  const hoverTimeClassName = isThumbActive ? 'hover-time active' : 'hover-time';

  const hoverTimePosition = getHoverTimePosition(
    seekHoverPosition,
    hoverTimeElement?.current,
    trackWidth,
    limitTimeTooltipBySides
  );

  const hoverTimeString = timeToTimeString(
    max,
    hoverTimeValue,
    offset,
    minutesPrefix,
    secondsPrefix
  );

  return (
    <div
      className={hoverTimeClassName}
      style={hoverTimePosition}
      ref={hoverTimeElement}
      data-testid="hover-time"
    >
      {isThumbActive && getPreviewScreenUrl && (
        <div
          className="preview-screen"
          style={{
            backgroundImage: `url(${getPreviewScreenUrl(hoverTimeValue)})`,
          }}
        />
      )}
      {isThumbActive && PreviewScreenComponent && (
        <div
          className="preview-screen"
        >
          <PreviewScreenComponent hoverTimeValue={hoverTimeValue} />
        </div>
      )}
      {label && <div>{label}</div>}
      {showHoverTimeString ? hoverTimeString : null}
    </div>
  );
};
