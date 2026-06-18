/**
 * Aurora — animated multi-blob gradient background.
 * Position this inside a `relative overflow-hidden` container.
 * Colors default to the project's navy/orange/purple palette.
 */
export default function Aurora({ className = '' }) {
    return (
        <div
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
            aria-hidden="true"
        >
            <div className="aurora-blob aurora-blob-1" />
            <div className="aurora-blob aurora-blob-2" />
            <div className="aurora-blob aurora-blob-3" />
        </div>
    );
}
