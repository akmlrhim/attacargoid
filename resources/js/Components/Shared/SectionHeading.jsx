import BlurText from '../ReactBits/BlurText';

export default function SectionHeading({ tag = '', title, subtitle, light = false, center = true }) {
    return (
        <div className={`mb-12 ${center ? 'text-center' : ''}`}>
            {tag && (
                <span className="inline-block text-orange font-semibold text-sm tracking-widest uppercase mb-3">
                    {tag}
                </span>
            )}
            <h2 className={`text-3xl lg:text-4xl font-black leading-tight ${light ? 'text-white' : 'text-navy'}`}>
                <BlurText text={title} />
            </h2>
            {subtitle && (
                <p className={`mt-4 text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/70' : 'text-gray-500'}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
