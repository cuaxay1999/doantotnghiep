export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  VALIDATION: 422,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  EXCEPTION: 500
}

export const ARTICLE_TYPE = {
  1: 'Kiến thức thú vị',
  2: 'Những điều cần biết',
  3: 'Chia sẻ kinh nghiệm',
  4: 'Khác'
}

export const ROLES = {
  SUPER_ADMIN: 0,
  ADMIN: 1
}

export const LIMITS = [20, 50, 100, 200]

export const NUMBER_PATTERN = /^[0-9]*$/
