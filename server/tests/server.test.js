const request = require('supertest');
const expect = require('expect');
var {ObjectID} = require('mongodb');
var {app} = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
  _id : new ObjectID,
  text : 'First Todo'
},{
  _id : new ObjectID,
  text :'Second Todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
  return Todo.insertMany(todos);
}).then(() => done());
});

describe('POST /todos', () =>{
  it('should create a new Todo', (done) => {
    var text = "Test Todo";

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) =>{
        done(e);
      });
      });
    });
  //   it('should not create a new Todo with invalid data', (done) => {
  //     request(app)
  //     .post('/todos')
  //     .send({})
  //     .expect(400)
  //     .end((err,res) => {
  //       if(err){
  //         return done(err);
  //       }
  //       Todo.find().then((todos) => {
  //         expect(todos.length).toBe(0);
  //         done();
  //       }).catch((e) =>{
  //         done(e);
  //       });
  // });
});
  describe('GET /Todos', () => {
    it('should get all todos', (done) => {
      request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      }).end(done);
    });
  });

  describe('GET /TODOS/ID', () => {
    it('should return todos with the given id', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
          }).end(done);
        })


    it('should return 404 when todo not found', (done) => {
      var newObjId = new ObjectID;
      request(app)
      .get(`/todos/${newObjId}`)
      .expect(404)
      .end(done)
    });

    it('should return 404 when ObjectId not valid', (done) => {
      request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
    })
  });
