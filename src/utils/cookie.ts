export const getCookie = (name: string): string | null => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  )
  return matches ? decodeURIComponent(matches[1]) : null
}

interface CookieProps {
  expires?: string | number | Date;

  [key: string]: string | number | Date | boolean | undefined;
}

export const setCookie = (name: string, value: string, props: CookieProps = {}): void => {
  let exp = props.expires
  if (typeof exp === 'number' && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp instanceof Date) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + '=' + value
  for (const propName in props) {
    updatedCookie += '; ' + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += '=' + propValue
    }
  }
  document.cookie = updatedCookie
}

export const deleteCookie = (name: string): void => {
  setCookie(name, '', { expires: -1 })
}
