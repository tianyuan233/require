
function readFile(path) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', path, false)
  xhr.send()
  return xhr.responseText
}

require.moduleCache = {}

function require(path) {
  var module = { exports: {} }
  //判断是否在缓存中
  if (require.moduleCache.hasOwnProperty(path)) {
    return require.moduleCache[path]
  }
  //读取模块的文本内容
  var code = readFile(path)
  var modFun = new Function('module, exports', code)

  require.moduleCache[path] = module.exports
  console.log('require.moduleCache[path]',require.moduleCache[path]);
  
  // important!
  // 将module.exports.xxx = 'xxx' or func 挂到了 require 函数声明的 module 上
  var returnValue = modFun(module, module.exports)
  console.log(returnValue)

  console.log('returnValue:', returnValue)

  if (returnValue === undefined) {
    //放入缓存
    require.moduleCache[path] = module.exports
  } else {
    require.moduleCache[path] = returnValue
  }
  console.log(require.moduleCache[path]);
  
  return require.moduleCache[path]
}
