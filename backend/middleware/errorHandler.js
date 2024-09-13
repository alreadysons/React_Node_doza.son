function errorHandler(err, req, res, next) {
    // 에러 로그를 콘솔에 출력 (개발 환경에서 유용)
    console.error(err.stack);
  
    // 클라이언트에게 에러 응답 전송
    res.status(err.statusCode || 500).json({
      message: err.message || '서버 오류가 발생했습니다.',
    });
  }
  
  module.exports = errorHandler;