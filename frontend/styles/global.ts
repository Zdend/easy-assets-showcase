import { css } from '@emotion/core';
import { COLORS, SHADES, BREAKPOINT, BASE_UNIT } from './variables';

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:400,700,800,900&display=swap');

  h1, h1.ant-typography, .ant-typography h1  {
    font-size: ${BASE_UNIT * 6}px;
    font-weight: 900;
    line-height: 1.5;
  }

  h2, h2.ant-typography, .ant-typography h2 {
    font-size: ${BASE_UNIT * 5}px;
    font-weight: 800;
    line-height: 1.5;
  }

  h3, h3.ant-typography, .ant-typography h3  {
    font-size: ${BASE_UNIT * 4}px;
    font-weight: 800;
    line-height: 1.5;
  }

  h4, h4.ant-typography, .ant-typography h4  {
    font-size: ${BASE_UNIT * 3.5}px;
    font-weight: 700;
  }

  h5, h5.ant-typography, .ant-typography h5  {
    font-size: ${BASE_UNIT * 3}px;
    font-weight: 700;
  }

  h6, h6.ant-typography, .ant-typography h6  {
    font-size: ${BASE_UNIT * 2.5}px;
    font-weight: 700;
  }

  @media (max-width: ${BREAKPOINT.sm}) {
    h1, h1.ant-typography, .ant-typography h1 {
      font-size: ${BASE_UNIT * 4.5}px;
    }

    h2, h2.ant-typography, .ant-typography h1 {
      font-size: ${BASE_UNIT * 4}px;
    }

    h3, h3.ant-typography, .ant-typography h3 {
      font-size: ${BASE_UNIT * 3.5}px;
    }

    h4, h4.ant-typography, .ant-typography h4 {
      font-size: ${BASE_UNIT * 3}px;
    }

    h5, h5.ant-typography, .ant-typography h5 {
      font-size: ${BASE_UNIT * 2.5}px;
    }

    h6, h6.ant-typography, .ant-typography h6 {
      font-size: ${BASE_UNIT * 2}px;
    }
  }

  ${Object.entries(COLORS).map(([name, variants]) => {
    return `
      .${name.toLocaleLowerCase()}--text {
        color: ${variants[5]};
      }
    `;
  })}

  .grey--text.shade-8 {
    color: ${COLORS.GREY[8]};
  }

  .white--text {
    color: ${SHADES.WHITE};
  }

  .black--text {
    color: ${SHADES.WHITE};
  }

  .white-space-nowrap {
    white-space: nowrap;
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
