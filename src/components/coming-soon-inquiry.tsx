type ComingSoonInquiryProps = {
  buttonLabel?: string;
  buttonClassName?: string;
};

export function ComingSoonInquiry({
  buttonLabel = "Request More Information",
  buttonClassName,
}: ComingSoonInquiryProps) {
  return (
    <a
      href="https://www.alfordcustombuilders.com/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${buttonLabel} on the current Alford site (opens in a new tab)`}
      className={buttonClassName}
    >
      {buttonLabel}
    </a>
  );
}
