export const SpinnerIcon = ({
    className = `animate-spin h-5 w-5 text-white fill-current`,
}) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        viewBox='0 0 512 512'
    >
        <path d='M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z' />
    </svg>
);

export const EyeOpenIcon = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        viewBox='0 0 576 512'
    >
        <path d='M160 256C160 185.3 217.3 128 288 128C358.7 128 416 185.3 416 256C416 326.7 358.7 384 288 384C217.3 384 160 326.7 160 256zM288 336C332.2 336 368 300.2 368 256C368 211.8 332.2 176 288 176C287.3 176 286.7 176 285.1 176C287.3 181.1 288 186.5 288 192C288 227.3 259.3 256 224 256C218.5 256 213.1 255.3 208 253.1C208 254.7 208 255.3 208 255.1C208 300.2 243.8 336 288 336L288 336zM95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6V112.6zM288 80C222.8 80 169.2 109.6 128.1 147.7C89.6 183.5 63.02 225.1 49.44 256C63.02 286 89.6 328.5 128.1 364.3C169.2 402.4 222.8 432 288 432C353.2 432 406.8 402.4 447.9 364.3C486.4 328.5 512.1 286 526.6 256C512.1 225.1 486.4 183.5 447.9 147.7C406.8 109.6 353.2 80 288 80V80z' />
    </svg>
);

export const EyeCloseIcon = ({ className }) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        viewBox='0 0 640 512'
    >
        <path d='M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM189.8 123.5L235.8 159.5C258.3 139.9 287.8 128 320 128C390.7 128 448 185.3 448 256C448 277.2 442.9 297.1 433.8 314.7L487.6 356.9C521.1 322.8 545.9 283.1 558.6 256C544.1 225.1 518.4 183.5 479.9 147.7C438.8 109.6 385.2 79.1 320 79.1C269.5 79.1 225.1 97.73 189.8 123.5L189.8 123.5zM394.9 284.2C398.2 275.4 400 265.9 400 255.1C400 211.8 364.2 175.1 320 175.1C319.3 175.1 318.7 176 317.1 176C319.3 181.1 320 186.5 320 191.1C320 202.2 317.6 211.8 313.4 220.3L394.9 284.2zM404.3 414.5L446.2 447.5C409.9 467.1 367.8 480 320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L120.8 191.2C102.1 214.5 89.76 237.6 81.45 255.1C95.02 286 121.6 328.5 160.1 364.3C201.2 402.4 254.8 432 320 432C350.7 432 378.8 425.4 404.3 414.5H404.3zM192 255.1C192 253.1 192.1 250.3 192.3 247.5L248.4 291.7C258.9 312.8 278.5 328.6 302 333.1L358.2 378.2C346.1 381.1 333.3 384 319.1 384C249.3 384 191.1 326.7 191.1 255.1H192z' />
    </svg>
);
