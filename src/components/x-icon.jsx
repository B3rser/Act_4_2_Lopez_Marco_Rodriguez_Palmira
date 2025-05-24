import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * @fileoverview Este módulo define el Web Component `x-icon` y el componente React `Icon`
 * que lo alimenta. `x-icon` actúa como un envoltorio para integrar la funcionalidad de React
 * dentro de un Custom Element, permitiendo su uso en HTML estándar y proporcionando una interfaz
 * de propiedades para renderizar íconos SVG de manera dinámica.
 */

/**
 * `iconPaths`
 * Un `Map` que almacena las definiciones de los íconos disponibles.
 * Cada clave es el nombre del ícono (string) y el valor es un objeto que contiene:
 * - `path`: La cadena de caracteres que define la forma SVG del ícono (atributo `d` de la etiqueta `path`).
 * - `viewBox`: La cadena de caracteres que define el `viewBox` del SVG.
 * - `useStroke`: Un booleano que indica si el ícono debe ser dibujado con `stroke` (borde) en lugar de `fill` (relleno).
 * @type {Map<string, { path: string; viewBox: string; useStroke?: boolean }>}
 */
const iconPaths = new Map([
    ['home', { path: 'M3 8.24998L12 1.83331L21 8.24998V18.3333C21 18.8195 20.7893 19.2859 20.4142 19.6297C20.0391 19.9735 19.5304 20.1666 19 20.1666H5C4.46957 20.1666 3.96086 19.9735 3.58579 19.6297C3.21071 19.2859 3 18.8195 3 18.3333V8.24998Z M9 20.1667V11H15V20.1667', useStroke: true, viewBox: '0 0 24 22' }],
    ['help', { path: 'M12 20.1666C17.5228 20.1666 22 16.0626 22 11C22 5.93737 17.5228 1.83331 12 1.83331C6.47715 1.83331 2 5.93737 2 11C2 16.0626 6.47715 20.1666 12 20.1666Z M9.09009 8.24997C9.32519 7.63733 9.78924 7.12074 10.4 6.79168C11.0108 6.46262 11.729 6.34233 12.4273 6.45213C13.1255 6.56192 13.7589 6.8947 14.2152 7.39154C14.6714 7.88838 14.9211 8.5172 14.9201 9.16664C14.9201 11 11.9201 11.9166 11.9201 11.9166 M12 14.6667V15.125', useStroke: true, viewBox: '0 0 24 22' }],
    ['success', { path: 'M22 10.1566V11C21.9988 12.9767 21.3005 14.9001 20.0093 16.4833C18.7182 18.0665 16.9033 19.2247 14.8354 19.7852C12.7674 20.3457 10.5573 20.2784 8.53447 19.5933C6.51168 18.9083 4.78465 17.6422 3.61096 15.984C2.43727 14.3257 1.87979 12.364 2.02168 10.3916C2.16356 8.41916 2.99721 6.54161 4.39828 5.03896C5.79935 3.53631 7.69279 2.48908 9.79619 2.05344C11.8996 1.61781 14.1003 1.81712 16.07 2.62164 M22 3.66669L12 12.8425L9 10.0925', useStroke: true, viewBox: '0 0 24 22' }],
    ['error', { path: 'M10.29 3.53834L1.82002 16.5C1.64539 16.7772 1.55299 17.0915 1.55201 17.4116C1.55103 17.7318 1.64151 18.0465 1.81445 18.3247C1.98738 18.6028 2.23675 18.8345 2.53773 18.9969C2.83871 19.1592 3.18082 19.2465 3.53002 19.25H20.47C20.8192 19.2465 21.1613 19.1592 21.4623 18.9969C21.7633 18.8345 22.0127 18.6028 22.1856 18.3247C22.3585 18.0465 22.449 17.7318 22.448 17.4116C22.4471 17.0915 22.3547 16.7772 22.18 16.5L13.71 3.53834C13.5318 3.26894 13.2807 3.0462 12.9812 2.89161C12.6817 2.73703 12.3438 2.65582 12 2.65582C11.6563 2.65582 11.3184 2.73703 11.0188 2.89161C10.7193 3.0462 10.4683 3.26894 10.29 3.53834V3.53834Z M12 8.25V11.9167 M12 14.6667V15.125', useStroke: true, viewBox: '0 0 24 22' }],
    ['arrow-right', { path: 'M5 11H19 M12 4.58331L19 11L12 17.4166', useStroke: true, viewBox: '0 0 24 22' }],
    ['cross', { path: 'M18 5.5L6 16.5 M6 5.5L18 16.5', useStroke: true, viewBox: '0 0 24 22' }],
    ['arrow-left', { path: 'M19 11H5 M12 4.58331L5 11L12 17.4166', useStroke: true, viewBox: '0 0 24 22' }],
    ['menu', { path: 'M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z', useStroke: false, viewBox: '0 0 448 512' }],
    ['edit', { path: 'M11 3.83331H4C3.46957 3.83331 2.96086 4.03525 2.58579 4.39469C2.21071 4.75414 2 5.24165 2 5.74998V19.1666C2 19.675 2.21071 20.1625 2.58579 20.5219C2.96086 20.8814 3.46957 21.0833 4 21.0833H18C18.5304 21.0833 19.0391 20.8814 19.4142 20.5219C19.7893 20.1625 20 19.675 20 19.1666V12.4583 M18.5 2.39585C18.8978 2.0146 19.4374 1.80042 20 1.80042C20.5626 1.80042 21.1022 2.0146 21.5 2.39585C21.8978 2.7771 22.1213 3.29418 22.1213 3.83335C22.1213 4.37251 21.8978 4.8896 21.5 5.27085L12 14.375L8 15.3333L9 11.5L18.5 2.39585Z', useStroke: true, viewBox: '0 0 24 22' }],
    ['dropdown', { path: 'M4 9L12 17L20 9', useStroke: true, viewBox: '0 0 24 22' }],
    ['bell', { path: 'M18 7.66669C18 6.14169 17.3679 4.67916 16.2426 3.60082C15.1174 2.52249 13.5913 1.91669 12 1.91669C10.4087 1.91669 8.88258 2.52249 7.75736 3.60082C6.63214 4.67916 6 6.14169 6 7.66669C6 14.375 3 16.2917 3 16.2917H21C21 16.2917 18 14.375 18 7.66669Z M13.73 20.125C13.5542 20.4154 13.3019 20.6565 12.9982 20.8241C12.6946 20.9917 12.3504 21.0799 12 21.0799C11.6496 21.0799 11.3054 20.9917 11.0018 20.8241C10.6982 20.6565 10.4458 20.4154 10.27 20.125', useStroke: true, viewBox: '0 0 24 22' }],
    ['pin', { path: 'M21 9.58331C21 16.2916 12 22.0416 12 22.0416C12 22.0416 3 16.2916 3 9.58331C3 7.29582 3.94821 5.10202 5.63604 3.48452C7.32387 1.86702 9.61305 0.958313 12 0.958313C14.3869 0.958313 16.6761 1.86702 18.364 3.48452C20.0518 5.10202 21 7.29582 21 9.58331Z M12 12.4583C13.6569 12.4583 15 11.1711 15 9.58331C15 7.99549 13.6569 6.70831 12 6.70831C10.3431 6.70831 9 7.99549 9 9.58331C9 11.1711 10.3431 12.4583 12 12.4583Z', useStroke: true, viewBox: '0 0 24 22' }],
    ['download', { path: 'M21 14.375V18.2083C21 18.7167 20.7893 19.2042 20.4142 19.5636C20.0391 19.9231 19.5304 20.125 19 20.125H5C4.46957 20.125 3.96086 19.9231 3.58579 19.5636C3.21071 19.2042 3 18.7167 3 18.2083V14.375 M7 9.58331L12 14.375L17 9.58331 M12 14.375V2.875', useStroke: true, viewBox: '0 0 24 22' }],
    ['bar-chart', { path: 'M18 19.1666V9.58331 M12 19.1666V3.83331 M6 19.1667V13.4167', useStroke: true, viewBox: '0 0 24 22' }],
    ['inbox', { path: 'M22 11.5H16L14 14.375H10L8 11.5H2 M5.45 4.89706L2 11.5V17.25C2 17.7583 2.21071 18.2458 2.58579 18.6053C2.96086 18.9647 3.46957 19.1666 4 19.1666H20C20.5304 19.1666 21.0391 18.9647 21.4142 18.6053C21.7893 18.2458 22 17.7583 22 17.25V11.5L18.55 4.89706C18.3844 4.57773 18.1292 4.309 17.813 4.12108C17.4967 3.93316 17.1321 3.8335 16.76 3.83331H7.24C6.86792 3.8335 6.50326 3.93316 6.18704 4.12108C5.87083 4.309 5.61558 4.57773 5.45 4.89706V4.89706Z', useStroke: true, viewBox: '0 0 24 22' }],
    ['filter', { path: 'M22 2.875H2L10 11.9408V18.2083L14 20.125V11.9408L22 2.875Z', useStroke: true, viewBox: '0 0 24 22' }],
    ['map', { path: 'M1 5.50004V20.1667L8 16.5L16 20.1667L23 16.5V1.83337L16 5.50004L8 1.83337L1 5.50004Z M8 1.83337V16.5 M16 5.5V20.1667', useStroke: true, viewBox: '0 0 24 22' }],
    ['zap', { path: 'M13 1.83337L3 12.8334H12L11 20.1667L21 9.16671H12L13 1.83337Z', useStroke: true, viewBox: '0 0 24 22' }],
    ['share', { path: 'M18 7.33337C19.6569 7.33337 21 6.10216 21 4.58337C21 3.06459 19.6569 1.83337 18 1.83337C16.3431 1.83337 15 3.06459 15 4.58337C15 6.10216 16.3431 7.33337 18 7.33337Z M6 13.75C7.65685 13.75 9 12.5188 9 11C9 9.48122 7.65685 8.25 6 8.25C4.34315 8.25 3 9.48122 3 11C3 12.5188 4.34315 13.75 6 13.75Z M18 20.1666C19.6569 20.1666 21 18.9354 21 17.4166C21 15.8978 19.6569 14.6666 18 14.6666C16.3431 14.6666 15 15.8978 15 17.4166C15 18.9354 16.3431 20.1666 18 20.1666Z M8.58984 12.3842L15.4198 16.0325 M15.4098 5.96753L8.58984 9.61586', useStroke: true, viewBox: '0 0 24 22' }],
    ['credit-card', { path: 'M21 3.66663H3C1.89543 3.66663 1 4.48744 1 5.49996V16.5C1 17.5125 1.89543 18.3333 3 18.3333H21C22.1046 18.3333 23 17.5125 23 16.5V5.49996C23 4.48744 22.1046 3.66663 21 3.66663Z M1 9.16663H23', useStroke: true, viewBox: '0 0 24 22' }],
    ['search', { path: 'M11 17.4167C15.4183 17.4167 19 14.1334 19 10.0833C19 6.03325 15.4183 2.75 11 2.75C6.58172 2.75 3 6.03325 3 10.0833C3 14.1334 6.58172 17.4167 11 17.4167Z M20.9999 19.25L16.6499 15.2625', useStroke: true, viewBox: '0 0 24 22' }],
    ['user', { path: 'M12 8C12 9.66 10.66 11 9 11C7.34 11 6 9.66 6 8C6 6.34 7.34 5 9 5C10.66 5 12 6.34 12 8Z M17 9C17 13.42 13.42 17 9 17C4.58 17 1 13.42 1 9C1 4.58 4.58 1 9 1C13.42 1 17 4.58 17 9ZM5 14.75C5.16 14.484 6.71 12 8.99 12C11.26 12 12.82 14.49 12.98 14.75C13.9099 14.107 14.6696 13.2477 15.194 12.2461C15.7183 11.2445 15.9915 10.1305 15.99 9C15.99 5.13 12.86 2 8.99 2C5.12 2 1.99 5.13 1.99 9C1.99 11.38 3.18 13.49 5 14.75Z', useStroke: false, viewBox: '0 0 18 18' }],
    ['calendar', { path: 'M19 3.66663H5C3.89543 3.66663 3 4.48744 3 5.49996V18.3333C3 19.3458 3.89543 20.1666 5 20.1666H19C20.1046 20.1666 21 19.3458 21 18.3333V5.49996C21 4.48744 20.1046 3.66663 19 3.66663Z M16 1.83337V5.50004 M8 1.83337V5.50004 M3 9.16663H21', useStroke: true, viewBox: '0 0 24 22' }],
    ['eye', { path: 'M2.59812 3.35503C4.34626 1.68635 7.08944 0 11 0C14.9106 0 17.6537 1.68635 19.4019 3.35503C20.2738 4.18734 20.9026 5.01845 21.3143 5.64266C21.5205 5.9553 21.6734 6.21764 21.7759 6.40449C21.8272 6.49797 21.866 6.57271 21.8927 6.62558C21.906 6.65202 21.9163 6.67301 21.9237 6.68815L21.9324 6.70645L21.9352 6.71222L21.9361 6.71425L21.9365 6.71505C21.9366 6.71539 21.9368 6.7157 21.2667 7C21.9368 7.2843 21.9366 7.28461 21.9365 7.28495L21.9361 7.28575L21.9352 7.28778L21.9324 7.29355L21.9237 7.31185C21.9163 7.32699 21.906 7.34798 21.8927 7.37442C21.866 7.42729 21.8272 7.50203 21.7759 7.59551C21.6734 7.78236 21.5205 8.04469 21.3143 8.35734C20.9026 8.98155 20.2738 9.81266 19.4019 10.645C17.6537 12.3137 14.9106 14 11 14C7.08944 14 4.34626 12.3137 2.59812 10.645C1.72617 9.81266 1.09741 8.98155 0.685679 8.35734C0.479452 8.04469 0.326624 7.78236 0.224088 7.59551C0.172793 7.50203 0.134001 7.42729 0.107332 7.37442C0.0939947 7.34798 0.0836813 7.32699 0.0763446 7.31185L0.0675629 7.29355L0.0648333 7.28778L0.0638817 7.28575L0.063509 7.28495C0.0633513 7.28461 0.0632049 7.2843 0.733333 7C0.0632049 6.7157 0.0633513 6.71539 0.063509 6.71505L0.0638817 6.71425L0.0648333 6.71222L0.0675629 6.70645L0.0763446 6.68815C0.0836813 6.67301 0.0939947 6.65202 0.107332 6.62558C0.134001 6.57271 0.172793 6.49797 0.224088 6.40449C0.326624 6.21764 0.479452 5.9553 0.685679 5.64266C1.09741 5.01845 1.72617 4.18734 2.59812 3.35503ZM0.733333 7L0.0632048 6.7157C-0.0210683 6.8967 -0.0210683 7.1033 0.0632048 7.2843L0.733333 7ZM1.55328 7C1.63956 7.15426 1.76345 7.36373 1.92682 7.61141C2.29425 8.16845 2.85716 8.91234 3.63521 9.65503C5.18707 11.1363 7.57723 12.6 11 12.6C14.4228 12.6 16.8129 11.1363 18.3648 9.65503C19.1428 8.91234 19.7057 8.16845 20.0732 7.61141C20.2365 7.36373 20.3604 7.15426 20.4467 7C20.3604 6.84574 20.2365 6.63627 20.0732 6.38859C19.7057 5.83155 19.1428 5.08766 18.3648 4.34497C16.8129 2.86365 14.4228 1.4 11 1.4C7.57723 1.4 5.18707 2.86365 3.63521 4.34497C2.85716 5.08766 2.29425 5.83155 1.92682 6.38859C1.76345 6.63627 1.63956 6.84574 1.55328 7ZM21.2667 7L21.9368 7.2843C22.0211 7.1033 22.0211 6.8967 21.9368 6.7157L21.2667 7Z M11.0001 4.20005C9.38006 4.20005 8.06676 5.45365 8.06676 7.00005C8.06676 8.54645 9.38006 9.80005 11.0001 9.80005C12.6201 9.80005 13.9334 8.54645 13.9334 7.00005C13.9334 5.45365 12.6201 4.20005 11.0001 4.20005ZM6.6001 7.00005C6.6001 4.68045 8.57004 2.80005 11.0001 2.80005C13.4302 2.80005 15.4001 4.68045 15.4001 7.00005C15.4001 9.31964 13.4302 11.2 11.0001 11.2C8.57004 11.2 6.6001 9.31964 6.6001 7.00005Z', useStroke: false, viewBox: '0 0 22 14' }],
    ['closed-eye', { path: 'M16.6446 2.10439C17.0119 1.90578 17.4824 2.02249 17.6954 2.36508L19.8962 5.90536C20.1092 6.24795 19.984 6.68669 19.6167 6.8853C19.2493 7.08392 18.7789 6.9672 18.5659 6.62461L16.3651 3.08433C16.1521 2.74174 16.2772 2.30301 16.6446 2.10439Z M0.2953 0.159245C0.625633 -0.089576 1.10971 -0.04155 1.37652 0.266514C2.90617 2.0327 5.66764 4.22147 10.0046 4.22147C14.3415 4.22147 17.103 2.0327 18.6327 0.266514C18.8995 -0.04155 19.3835 -0.089576 19.7139 0.159245C20.0442 0.408065 20.0957 0.85951 19.8289 1.16757C18.1294 3.12989 14.9707 5.65551 10.0046 5.65551C5.03846 5.65551 1.87979 3.12989 0.180277 1.16757C-0.0865296 0.85951 -0.035032 0.408065 0.2953 0.159245Z M3.35397 2.10361C3.72179 2.30147 3.84797 2.73995 3.6358 3.08297L1.43497 6.64118C1.22281 6.9842 0.752634 7.10188 0.384815 6.90401C0.0169967 6.70615 -0.109183 6.26767 0.102984 5.92465L2.30382 2.36644C2.51598 2.02342 2.98615 1.90575 3.35397 2.10361Z', useStroke: false, viewBox: '0 0 20 6' }],
    ['heart', { path: 'M20.8401 4.2258C20.3294 3.75739 19.7229 3.38581 19.0555 3.13229C18.388 2.87878 17.6726 2.74829 16.9501 2.74829C16.2276 2.74829 15.5122 2.87878 14.8448 3.13229C14.1773 3.38581 13.5709 3.75739 13.0601 4.2258L12.0001 5.19746L10.9401 4.2258C9.90843 3.28008 8.50915 2.74878 7.05012 2.74878C5.59109 2.74878 4.19181 3.28008 3.16012 4.2258C2.12843 5.17152 1.54883 6.45418 1.54883 7.79163C1.54883 9.12908 2.12843 10.4117 3.16012 11.3575L4.22012 12.3291L12.0001 19.4608L19.7801 12.3291L20.8401 11.3575C21.3511 10.8893 21.7565 10.3334 22.033 9.72154C22.3096 9.1097 22.4519 8.45391 22.4519 7.79163C22.4519 7.12935 22.3096 6.47356 22.033 5.86172C21.7565 5.24988 21.3511 4.69399 20.8401 4.2258V4.2258Z', useStroke: true, viewBox: '0 0 24 22' }],
    ['caret-right', { path: 'M6 4L11 8L6 12V4Z', useStroke: false, viewBox: '0 0 16 16' }],
    ['analyze', { path: 'M17.521 10.875C21.1914 10.875 24.1668 13.8504 24.1668 17.5208C24.1668 18.9195 23.7347 20.2172 22.9968 21.2878L26.3887 24.6797L24.6799 26.3886L21.288 22.9967C20.2173 23.7346 18.9196 24.1667 17.521 24.1667C13.8506 24.1667 10.8751 21.1912 10.8751 17.5208C10.8751 13.8504 13.8506 10.875 17.521 10.875ZM17.521 13.2917C15.1852 13.2917 13.2918 15.1852 13.2918 17.5208C13.2918 19.8566 15.1853 21.75 17.521 21.75C19.8567 21.75 21.7501 19.8565 21.7501 17.5208C21.7501 15.1851 19.8566 13.2917 17.521 13.2917ZM9.68963 16.9166C9.67441 17.1161 9.66679 17.3175 9.66675 17.5208C9.66675 18.1447 9.73947 18.7516 9.87688 19.3334L2.41675 19.3333V16.9167L9.68963 16.9166ZM7.25018 3.625V15.7083H3.62512V3.625H7.25018ZM12.0835 8.45831L12.0833 11.8534C11.0111 12.8824 10.2303 14.2127 9.877 15.7083L8.45849 15.7083V8.45831H12.0835ZM16.9168 6.04169V9.68957C15.6267 9.78695 14.3811 10.2034 13.2918 10.9014V6.04163L16.9168 6.04169ZM21.7501 7.25L21.7502 10.9014C20.6609 10.2034 19.4152 9.78695 18.1252 9.68957V7.25H21.7501Z', useStroke: false, viewBox: '0 0 29 29' }],
    ['chat', { path: 'M3 12C1.9 12 1 11.1 1 10V5C1 3.9 1.9 3 3 3H11C12.1 3 13 3.9 13 5V10C13 11.1 12.1 12 11 12H9V15L6 12H3ZM21 18C22.1 18 23 17.1 23 16V11C23 9.9 22.1 9 21 9H15V10C15 12.2 13.2 14 11 14V16C11 17.1 11.9 18 13 18H15V21L18 18H21Z', useStroke: false, viewBox: '0 0 24 22' }],
    ['result', { path: 'M10.5 17.25H16.5V18.75H10.5V17.25ZM7.5 17.25H9V18.75H7.5V17.25ZM10.5 13.5H16.5V15H10.5V13.5ZM7.5 13.5H9V15H7.5V13.5ZM10.5 9.75H16.5V11.25H10.5V9.75ZM7.5 9.75H9V11.25H7.5V9.75Z M18.75 3.75H16.5V3C16.5 2.60218 16.342 2.22064 16.0607 1.93934C15.7794 1.65804 15.3978 1.5 15 1.5H9C8.60218 1.5 8.22064 1.65804 7.93934 1.93934C7.65804 2.22064 7.5 2.60218 7.5 3V3.75H5.25C4.85218 3.75 4.47064 3.90804 4.18934 4.18934C3.90804 4.47064 3.75 4.85218 3.75 5.25V21C3.75 21.3978 3.90804 21.7794 4.18934 22.0607C4.47064 22.342 4.85218 22.5 5.25 22.5H18.75C19.1478 22.5 19.5294 22.342 19.8107 22.0607C20.092 21.7794 20.25 21.3978 20.25 21V5.25C20.25 4.85218 20.092 4.47064 19.8107 4.18934C19.5294 3.90804 19.1478 3.75 18.75 3.75ZM9 3H15V6H9V3ZM18.75 21H5.25V5.25H7.5V7.5H16.5V5.25H18.75V21Z', useStroke: false, viewBox: '0 0 24 24' }],
    ['x', { path: 'M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z', useStroke: false, viewBox: '0 0 50 50' }],
    ['instagram', { path: 'M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z', useStroke: false, viewBox: '0 0 50 50' }],
    ['facebook', { path: 'M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z', useStroke: false, viewBox: "88.428 12.828 107.543 207.085" }],
    ['tiktok', { path: 'M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z', useStroke: false, viewBox: '0 0 32 32' }],
]);

/**
 * `Icon` (Componente React)
 *
 * Este componente funcional de React renderiza un ícono SVG basado en su nombre, tamaño y color.
 * Obtiene la definición del ícono (path, viewBox, etc.) del mapa `iconPaths`.
 * Si el ícono no se encuentra, no renderiza nada.
 *
 * @param {object} props - Las propiedades que recibe el componente.
 * @param {string} props.name - El nombre del ícono a renderizar, debe coincidir con una clave en `iconPaths`.
 * @param {number} [props.size=24] - El tamaño (ancho y alto) del ícono en píxeles.
 * @param {string} [props.color='var(--color-black)'] - El color del ícono. Puede ser un nombre de color, un código hexadecimal, RGB, o una variable CSS.
 * @returns {JSX.Element|null}
 */
const Icon = ({ name, size = 24, color = 'var(--color-black)' }) => {
    const icon = iconPaths.get(name);
    if (!icon) return null;

    return (
        <svg
            width={size} // Establece el ancho del SVG
            height={size} // Establece la altura del SVG
            viewBox={icon.viewBox} // Define el sistema de coordenadas para el contenido del SVG
            fill={icon.useStroke ? 'none' : color} // Rellena el ícono si no usa stroke
            stroke={icon.useStroke ? color : 'none'} // Dibuja el stroke si el ícono lo requiere
            strokeWidth={icon.useStroke ? 2 : 0} // Ancho del stroke si se usa
            strokeLinecap={icon.useStroke ? 'round' : undefined} // Estilo de los extremos del stroke
            strokeLinejoin={icon.useStroke ? 'round' : undefined} // Estilo de las uniones del stroke
            xmlns="http://www.w3.org/2000/svg" // Define el namespace SVG
        >
            <path d={icon.path} /> {/* Dibuja la forma del ícono */}
        </svg>
    );
};

// Web Component `XIcon`

/**
 * `CustomIconElement`
 *
 * Esta clase extiende `HTMLElement` para crear un Custom Element (`<x-icon>`).
 * Actúa como un puente entre el HTML estándar y el componente React `Icon`.
 * Gestiona los atributos HTML del Custom Element (`name`, `size`, `color`)
 * y los pasa como propiedades al componente React, renderizándolo dentro de su Shadow DOM.
 *
 * @extends HTMLElement
 */
class CustomIconElement extends HTMLElement {
    /**
     * Propiedad estática `observedAttributes`.
     * Define qué atributos HTML el Custom Element observará para cambios.
     * Cuando uno de estos atributos cambia, se invoca `attributeChangedCallback`.
     * @static
     * @readonly
     * @type {string[]}
     */
    static get observedAttributes() {
        return ['name', 'size', 'color'];
    }

    /**
     * Constructor de la clase `CustomIconElement`.
     * Crea un punto de montaje (`<span>`) dentro del Shadow DOM y adjunta el Shadow DOM.
     * Inicializa `reactRoot` a `null` para crearlo solo cuando sea necesario.
     */
    constructor() {
        super();
        const mountPoint = document.createElement('span'); // Punto de montaje para el componente React
        this.attachShadow({ mode: 'open' }).appendChild(mountPoint); // Adjunta Shadow DOM y añade el punto de montaje
        this.mountPoint = mountPoint; // Guarda la referencia al punto de montaje
        this.reactRoot = null; // Se inicializará cuando se renderice React por primera vez
    }

    /**
     * `connectedCallback`.
     * Se invoca cuando el Custom Element es añadido al DOM.
     * Realiza el renderizado inicial del componente React `Icon`.
     */
    connectedCallback() {
        this.renderReact();
    }

    /**
     * `attributeChangedCallback`.
     * Se invoca cuando uno de los atributos definidos en `observedAttributes` cambia.
     * Fuerza un re-renderizado del componente React `Icon` para reflejar el cambio en la UI.
     * @param {string} name - El nombre del atributo que cambió.
     * @param {string|null} oldValue - El valor anterior del atributo.
     * @param {string|null} newValue - El nuevo valor del atributo.
     */
    attributeChangedCallback() {
        this.renderReact();
    }

    /**
     * `renderReact` (Método Interno).
     * Este método es responsable de renderizar o re-renderizar el componente `Icon` de React
     * dentro del Shadow DOM del Custom Element.
     * Obtiene los valores actuales de los atributos del Custom Element y los pasa como props al componente `Icon`.
     * Crea la raíz de React si aún no existe.
     */
    renderReact() {
        // Obtiene los valores de los atributos del Custom Element.
        const name = this.getAttribute('name');
        const size = this.getAttribute('size');
        const color = this.getAttribute('color');

        // Crea la raíz de React solo una vez.
        if (!this.reactRoot) {
            this.reactRoot = ReactDOM.createRoot(this.mountPoint);
        }

        // Renderiza el componente React `Icon` con las propiedades obtenidas de los atributos.
        this.reactRoot.render(
            <Icon
                name={name}
                // Convierte el tamaño a número si existe, de lo contrario es `undefined` para usar el valor por defecto de React.
                size={size ? Number(size) : undefined}
                // Usa el color del atributo si existe, de lo contrario usa el color por defecto.
                color={color ? color : 'var(--color-black)'}
            />
        );
    }
}

// Define el Custom Element 'x-icon' en el navegador, asociándolo con la clase CustomIconElement.
customElements.define('x-icon', CustomIconElement);
