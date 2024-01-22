// Import the framework and instantiate it
import Fastify from 'fastify'
const fastify = Fastify();

const users = [
    {
        id: 1,
        name: "asif"
    },
    {
        id: 2,
        name: "ahmed"
    },
    {
        id: 3,
        name: "ali"
    }
]
// Declare a route
fastify.get('/users', (request, reply) => {
  reply.send(users)
})

fastify.post('/user', (request, reply) => {
    users.push({id:users.length + 1, ...request.body})
    reply.send({message:"User Added Successfully"});
});

fastify.put("/user/:id",(request, reply)=>{
    let idx = users.findIndex(val => val.id === Number(request.params.id));
    users.splice(idx, 1 ,{ id: Number(request.params.id), ...request.body});
    reply.send({message:"User Updated Successfully"});
})

fastify.delete("/user/:id",(request, reply)=>{
    let idx = users.findIndex(val => val.id === Number(request.params.id));
    users.splice(idx, 1);
    reply.send({message:"User Deleted Successfully"});
})





// Run the server!
try {
  await fastify.listen({port: 3000})
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}