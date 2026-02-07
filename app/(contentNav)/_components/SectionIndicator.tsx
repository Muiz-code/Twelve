interface SectionIndicatorProps {
  sectionNumber: string;
  sectionLabel?: string;
}

export default function SectionIndicator({
  sectionNumber,
  sectionLabel,
}: SectionIndicatorProps) {
  return (
    <div className="flex items-center justify-between md:gap-0 gap-2 mt-0 md:mt-20 w-full">
      <div className="w-full flex items-center">
        <span className="md:text-[20px] text-[13px] text-[#FFF7EB] font-light border-1 border-[#FFF7EB40] md:p-5 p-2">
          {sectionNumber}
        </span>
        <span className="md:w-271.25 w-full h-px bg-[#FFF7EB40]"></span>
      </div>
      {sectionLabel && (
        <span className="md:text-[20px] text-[13px] text-[#FFF7EB] w-auto uppercase md:w-full flex text-center items-center justify-center">
          {sectionLabel}
        </span>
      )}
    </div>
  );
}
