import { createBox } from '@shopify/restyle'
import {Theme} from '../styles/light'

const Box = createBox<Theme>()
export type BoxProps = React.ComponentProps<typeof Box>

export default Box
