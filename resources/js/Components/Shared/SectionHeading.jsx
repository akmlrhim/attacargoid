import BlurText from "../ReactBits/BlurText";

export default function SectionHeading({
  title,
  subtitle,
  light = false,
  center = true,
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-black leading-tight ${light ? "text-white" : "text-navy"}`}
      >
        <BlurText text={title} />
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-md max-w-2xl ${center ? "mx-auto" : ""} ${light ? "text-white" : "text-black"}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
