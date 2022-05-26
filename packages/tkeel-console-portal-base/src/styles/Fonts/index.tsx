import { css, Global } from '@emotion/react';

import RobotoBlackTtf from './fonts/roboto/Roboto-Black.ttf';
import RobotoBlackWoff from './fonts/roboto/Roboto-Black.woff';
import RobotoBlackWoff2 from './fonts/roboto/Roboto-Black.woff2';
import RobotoBlackItalicTtf from './fonts/roboto/Roboto-BlackItalic.ttf';
import RobotoBlackItalicWoff from './fonts/roboto/Roboto-BlackItalic.woff';
import RobotoBlackItalicWoff2 from './fonts/roboto/Roboto-BlackItalic.woff2';
import RobotoBoldTtf from './fonts/roboto/Roboto-Bold.ttf';
import RobotoBoldWoff from './fonts/roboto/Roboto-Bold.woff';
import RobotoBoldWoff2 from './fonts/roboto/Roboto-Bold.woff2';
import RobotoBoldItalicTtf from './fonts/roboto/Roboto-BoldItalic.ttf';
import RobotoBoldItalicWoff from './fonts/roboto/Roboto-BoldItalic.woff';
import RobotoBoldItalicWoff2 from './fonts/roboto/Roboto-BoldItalic.woff2';
import RobotoItalicTtf from './fonts/roboto/Roboto-Italic.ttf';
import RobotoItalicWoff from './fonts/roboto/Roboto-Italic.woff';
import RobotoItalicWoff2 from './fonts/roboto/Roboto-Italic.woff2';
import RobotoLightTtf from './fonts/roboto/Roboto-Light.ttf';
import RobotoLightWoff from './fonts/roboto/Roboto-Light.woff';
import RobotoLightWoff2 from './fonts/roboto/Roboto-Light.woff2';
import RobotoLightItalicTtf from './fonts/roboto/Roboto-LightItalic.ttf';
import RobotoLightItalicWoff from './fonts/roboto/Roboto-LightItalic.woff';
import RobotoLightItalicWoff2 from './fonts/roboto/Roboto-LightItalic.woff2';
import RobotoMediumTtf from './fonts/roboto/Roboto-Medium.ttf';
import RobotoMediumWoff from './fonts/roboto/Roboto-Medium.woff';
import RobotoMediumWoff2 from './fonts/roboto/Roboto-Medium.woff2';
import RobotoMediumItalicTtf from './fonts/roboto/Roboto-MediumItalic.ttf';
import RobotoMediumItalicWoff from './fonts/roboto/Roboto-MediumItalic.woff';
import RobotoMediumItalicWoff2 from './fonts/roboto/Roboto-MediumItalic.woff2';
import RobotoRegularTtf from './fonts/roboto/Roboto-Regular.ttf';
import RobotoRegularWoff from './fonts/roboto/Roboto-Regular.woff';
import RobotoRegularWoff2 from './fonts/roboto/Roboto-Regular.woff2';
import RobotoThinTtf from './fonts/roboto/Roboto-Thin.ttf';
import RobotoThinWoff from './fonts/roboto/Roboto-Thin.woff';
import RobotoThinWoff2 from './fonts/roboto/Roboto-Thin.woff2';
import RobotoThinItalicTtf from './fonts/roboto/Roboto-ThinItalic.ttf';
import RobotoThinItalicWoff from './fonts/roboto/Roboto-ThinItalic.woff';
import RobotoThinItalicWoff2 from './fonts/roboto/Roboto-ThinItalic.woff2';
import RobotoMonoItalicTtf from './fonts/roboto-mono/RobotoMono-Italic.ttf';
import RobotoMonoItalicWoff from './fonts/roboto-mono/RobotoMono-Italic.woff';
import RobotoMonoItalicWoff2 from './fonts/roboto-mono/RobotoMono-Italic.woff2';
import RobotoMonoMediumTtf from './fonts/roboto-mono/RobotoMono-Medium.ttf';
import RobotoMonoMediumWoff from './fonts/roboto-mono/RobotoMono-Medium.woff';
import RobotoMonoMediumWoff2 from './fonts/roboto-mono/RobotoMono-Medium.woff2';
import RobotoMonoMediumItalicTtf from './fonts/roboto-mono/RobotoMono-MediumItalic.ttf';
import RobotoMonoMediumItalicWoff from './fonts/roboto-mono/RobotoMono-MediumItalic.woff';
import RobotoMonoMediumItalicWoff2 from './fonts/roboto-mono/RobotoMono-MediumItalic.woff2';
import RobotoMonoRegularTtf from './fonts/roboto-mono/RobotoMono-Regular.ttf';
import RobotoMonoRegularWoff from './fonts/roboto-mono/RobotoMono-Regular.woff';
import RobotoMonoRegularWoff2 from './fonts/roboto-mono/RobotoMono-Regular.woff2';

export default function Fonts() {
  const globalStyles = css`
    @font-face {
      font-family: Roboto;
      src: url('${RobotoThinWoff2}') format('woff2'),
        url('${RobotoThinWoff}') format('woff'),
        url(${RobotoThinTtf}) format('truetype');
      font-weight: 100;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoThinItalicWoff2}') format('woff2'),
        url('${RobotoThinItalicWoff}') format('woff'),
        url('${RobotoThinItalicTtf}') format('truetype');
      font-weight: 100;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoLightWoff2}') format('woff2'),
        url('${RobotoLightWoff}') format('woff'),
        url('${RobotoLightTtf}') format('truetype');
      font-weight: 300;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoLightItalicWoff2}') format('woff2'),
        url('${RobotoLightItalicWoff}') format('woff'),
        url('${RobotoLightItalicTtf}') format('truetype');
      font-weight: 300;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoRegularWoff2}') format('woff2'),
        url('${RobotoRegularWoff}') format('woff'),
        url('${RobotoRegularTtf}') format('truetype');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoRegularWoff2}') format('woff2'),
        url('${RobotoRegularWoff}') format('woff'),
        url('${RobotoRegularTtf}') format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoItalicWoff2}') format('woff2'),
        url('#${RobotoItalicWoff}') format('woff'),
        url('#${RobotoItalicTtf}') format('truetype');
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoItalicWoff2}') format('woff2'),
        url('#${RobotoItalicWoff}') format('woff'),
        url('#${RobotoItalicTtf}') format('truetype');
      font-weight: normal;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoMediumWoff2}') format('woff2'),
        url('${RobotoMediumWoff}') format('woff'),
        url('${RobotoMediumTtf}') format('truetype');
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoMediumItalicWoff2}') format('woff2'),
        url('${RobotoMediumItalicWoff}') format('woff'),
        url('${RobotoMediumItalicTtf}') format('truetype');
      font-weight: 500;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoBoldWoff2}') format('woff2'),
        url('${RobotoBoldWoff}') format('woff'),
        url('${RobotoBoldTtf}') format('truetype');
      font-weight: 700;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoBoldWoff2}') format('woff2'),
        url('${RobotoBoldWoff}') format('woff'),
        url('${RobotoBoldTtf}') format('truetype');
      font-weight: bold;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoBoldItalicWoff2}') format('woff2'),
        url('${RobotoBoldItalicWoff}') format('woff'),
        url('${RobotoBoldItalicTtf}') format('truetype');
      font-weight: 700;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoBoldItalicWoff2}') format('woff2'),
        url('${RobotoBoldItalicWoff}') format('woff'),
        url('${RobotoBoldItalicTtf}') format('truetype');
      font-weight: bold;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoBlackWoff2}') format('woff2'),
        url('${RobotoBlackWoff}') format('woff'),
        url('${RobotoBlackTtf}') format('truetype');
      font-weight: 900;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto;
      src: url('${RobotoBlackItalicWoff2}') format('woff2'),
        url('${RobotoBlackItalicWoff}') format('woff'),
        url('${RobotoBlackItalicTtf}') format('truetype');
      font-weight: 900;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto Mono;
      src: url('${RobotoMonoRegularWoff2}') format('woff2'),
        url('${RobotoMonoRegularWoff}') format('woff'),
        url('${RobotoMonoRegularTtf}') format('truetype');
      font-weight: 400;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto Mono;
      src: url('${RobotoMonoRegularWoff2}') format('woff2'),
        url('${RobotoMonoRegularWoff}') format('woff'),
        url('${RobotoMonoRegularTtf}') format('truetype');
      font-weight: normal;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto Mono;
      src: url('${RobotoMonoItalicWoff2}') format('woff2'),
        url('${RobotoMonoItalicWoff}') format('woff'),
        url('${RobotoMonoItalicTtf}') format('truetype');
      font-weight: 400;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto Mono;
      src: url('${RobotoMonoItalicWoff2}') format('woff2'),
        url('${RobotoMonoItalicWoff}') format('woff'),
        url('${RobotoMonoItalicTtf}') format('truetype');
      font-weight: normal;
      font-style: italic;
    }

    @font-face {
      font-family: Roboto Mono;
      src: url('${RobotoMonoMediumWoff2}') format('woff2'),
        url('${RobotoMonoMediumWoff}') format('woff'),
        url('${RobotoMonoMediumTtf}') format('truetype');
      font-weight: 500;
      font-style: normal;
    }

    @font-face {
      font-family: Roboto Mono;
      src: url('${RobotoMonoMediumItalicWoff2}') format('woff2'),
        url('${RobotoMonoMediumItalicWoff}') format('woff'),
        url('${RobotoMonoMediumItalicTtf}') format('truetype');
      font-weight: 500;
      font-style: italic;
    }
  `;

  return <Global styles={globalStyles} />;
}
