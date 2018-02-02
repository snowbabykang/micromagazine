//字数统计
//txt:文本框jquery对象 
//limit:限制的字数 
//isbyte:true:视limit为字节数；false:视limit为字符数 
//cb：回调函数，参数为可输入的字数 
function InitLimit(txt, limit, isbyte, cb) {
	txt.live("keyup change",function() {   
		var str = $(this).val();
		var charLen;
		var byteLen = 0;
		if (isbyte) {
			for (var i = 0; i < str.length; i++) {
				if (str.charCodeAt(i) > 255) {
					byteLen += 2
				} else {
					byteLen++
				}
			}
			charLen = Math.floor((limit - byteLen) / 2)
		} else {
			byteLen = str.length;
			charLen = limit - byteLen
		}
		cb(charLen)
	})
};
//该函数用于输出框，当输入值大于指定的最大值的时候，返回当长度等于Max的值
function getByteVal(val, max) {
	var returnValue = '';
	var byteValLen = 0;
	for (var i = 0; i < val.length; i++) {
		if (val[i].match(/[^\x00-\xff]/ig) != null) byteValLen += 2;
		else byteValLen += 1;
		if (byteValLen > max) break;
		returnValue += val[i]
	}
	return returnValue
};
