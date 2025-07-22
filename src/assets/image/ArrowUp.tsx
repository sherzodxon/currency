type ArrowUpProps = {
    className:string;
}

const ArrowUp : React.FC < ArrowUpProps > = ({className="arrow-up"}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            className={className}
            viewBox="0 0 15 15">
            <path
                fill-rule="evenodd"
                d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0z"/>
        </svg>
    );
}

export default ArrowUp;