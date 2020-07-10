import server from '../../app';

const port = process.env.port || 3333;

server.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)
});

export default server;