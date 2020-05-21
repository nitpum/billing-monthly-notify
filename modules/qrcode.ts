import qrcode from 'qrcode'

interface QRCodeOptionsColor {
  dark: String
  light: String
}

interface QRCodeOptions {
  type: String
  color: QRCodeOptionsColor
}

export default async (
  payload: String,
  options: QRCodeOptions = {
    type: 'jpg',
    color: { dark: '#003b6a', light: '#f7f8f7' },
  }
): Promise<any> => {
  const { svg } = await qrcode.toString(payload, options)
  return svg
}
