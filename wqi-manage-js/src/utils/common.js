import router from '@/routers'

export function replaceUrl(query = {}) {
  const params = []
  for (const key in query) {
    if (query[key] === undefined || !query[key]) {
      continue
    }
    params.push(`${key}=${query[key]}`)
    router.currentRoute.query[key] = query[key]
  }
  history.replaceState({}, null, router.currentRoute.path + (params.length ? '?' + params.join('&') : ''))
}

export function wqiCaculateStatus(wqi) {
  if (wqi < 10) {
    return {
      bgClass: 'wqi--danger',
      text: 'Ô nhiễm nặng'
    }
  } else if (wqi >= 0 && wqi <= 25) {
    return {
      bgClass: 'wqi--bad',
      text: 'Ô nhiễm'
    }
  } else if (wqi > 25 && wqi <= 50) {
    return {
      bgClass: 'wqi--warning',
      text: 'Tệ'
    }
  } else if (wqi > 50 && wqi <= 75) {
    return {
      bgClass: 'wqi--mid',
      text: 'Kém'
    }
  } else if (wqi > 75 && wqi <= 90) {
    return {
      bgClass: 'wqi--medium',
      text: 'Trung bình'
    }
  } else if (wqi > 90 && wqi <= 100) {
    return {
      bgClass: 'wqi--good',
      text: 'Tốt'
    }
  }
}
