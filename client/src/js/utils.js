
function ajax(options) {
  // 1. 参数验证
  // 1-1. 验证 options 存在, 并且是一个对象
  if (Object.prototype.toString.call(options) !== '[object Object]') throw new Error('options 必须传递, 并且是一个对象数据类型 !!!')

  // 拿到 options 里面的数据
  const { url, method, data, async, success, error, dataType } = options

  // 1-2. 验证 url 参数必填
  if (!url) throw new Error('url 参数为必填参数, 请填写一个请求地址')

  // 1-3. 验证 method 参数
  if (!(method === undefined || /^(get|post)$/i.test(method))) throw new Error('method 参数目前只接受 GET 或者 POST 请求方式')

  // 1-4. 验证 async 参数
  if (!(async === undefined || typeof async === 'boolean')) throw new Error('async 参数必须填写一个 布尔值')

  // 1-5. 验证 data 参数
  if (!(data === undefined || data === '' || /^(.+=.+&?)*$/.test(data))) throw new Error('data 参数必须符合 key=value&key=value 的数据格式')

  // 1-6. 验证 success 参数
  if (!(success === undefined || typeof success === 'function')) throw new Error('success 参数必须为一个函数数据类型')

  // 1-7. 验证 error 参数
  if (!(error === undefined || typeof error === 'function')) throw new Error('error 参数必须为一个函数数据类型')

  // 1-8. 验证 datType 参数
  if (!(dataType === undefined || typeof dataType === 'boolean')) throw new Error('dataType 参数必须为一个 布尔值')

  // 2. 准备一个默认值对象
  const _default = {
    url,
    method: method || 'GET',
    async: typeof async === 'boolean' ? async : true,
    data: data || '',
    success: success || function () {},
    error: error || function () {},
    // 设置 dataType 的默认值, 和 async 是一样的操作方式
    dataType: typeof dataType === 'boolean' ? dataType : true
  }

  // 2-2. 判断请求方式为 GET
  if (_default.method.toUpperCase() === 'GET' && _default.data !== '') _default.url += '?' + data

  // 3. 发送请求
  let xhr = null
  try {
    xhr = new XMLHttpRequest()
  } catch (err) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.open(_default.method, _default.url, _default.async)
  xhr.onreadystatechange = function () {
    const { readyState, status, responseText } = xhr

    if (readyState === 4 && /^2\d{2}$/.test(status)) {
      // 调用成功的函数的时候, 需要判断, 如果你的 dataType 是一个 true, 那么我执行一个 JSON.parse
      // 调用成功的函数的时候, 需要判断, 如果你的 dataType 是一个 fasle, 那么我不执行 JSON.parse
      _default.success(_default.dataType === true ? JSON.parse(responseText) : responseText)
    }

    if (readyState === 4 && status === 404) {
      _default.error('Not Found 您的请求地址不存在')
    }
  }
  if (_default.method.toUpperCase() === 'POST') {
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    xhr.send(_default.data)
  } else {
    xhr.send()
  }
}
export default ajax;