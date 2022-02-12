import { createGlobalStyle } from "styled-components";

import { Reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
    ${Reset}

    html,body {
        font-size: ${({ theme }) => theme.fonts.sizes.md};
        color: ${({ theme }) => theme.colors.black[500]};
        background-color: ${({ theme }) => theme.colors.white[600]};
    }
`;
