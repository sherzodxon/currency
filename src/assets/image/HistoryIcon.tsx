type HistoryIconProps = {}

const HistoryIcon : React.FC < HistoryIconProps > = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5"/>
            <path
                d="M12 7.5V12l3.5 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>

    );
}

export default HistoryIcon;