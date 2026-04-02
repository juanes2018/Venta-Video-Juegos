const errorHandler = (err, req, res, next) => {
const statusCode = err.statusCode ||500;
const message = err.message || 'Ocurrio un error Inesperado';

console.error(
    `[Error] ${new Date().toISOString()} - ${statusCode} - ${message}`);

if (err.stack) {
    console.error(err.stack);   
}

res.status(statusCode).json({
        status: 'error',
        message,
        statusCode,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })

    
}); 
};


module.exports = errorHandler;