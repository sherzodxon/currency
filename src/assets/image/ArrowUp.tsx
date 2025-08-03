type ArrowUpProps = {
    className: string;
}

const ArrowUp : React.FC < ArrowUpProps > = ({
    className = "arrow-up"
}) => {
    return (
        <svg
            className={className}
            width="25"
            height="26"
            viewBox="0 0 16 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.21994 12.5H9.77994C11.9933 12.5 12.8933 10.9333 11.7933 9.02001L11.2999 8.16668C11.1799 7.96001 10.9599 7.83334 10.7199 7.83334H5.27994C5.03994 7.83334 4.81994 7.96001 4.69994 8.16668L4.20661 9.02001C3.10661 10.9333 4.00661 12.5 6.21994 12.5Z"
                fill="currentColor"/>
            <path
                opacity="0.4"
                d="M5.85998 7.16666H10.1466C10.4066 7.16666 10.5666 6.88666 10.4333 6.66666L10.0066 5.93332C8.90664 4.01999 7.09331 4.01999 5.99331 5.93332L5.56664 6.66666C5.43998 6.88666 5.59998 7.16666 5.85998 7.16666Z"
                fill="currentColor"/>
        </svg>
    );
}

export default ArrowUp;