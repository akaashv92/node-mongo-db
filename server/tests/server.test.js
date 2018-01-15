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
  text :'Second Todo',
  completed : true,
  completedAt : 333
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

  describe('DELETE /todos/id', () => {
    it('should delete the todo with the given id', (done) => {
      //var newObjId = new ObjectID;
      var hexId = todos[0]._id.toHexString();
      request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeNull();
          done();
        }).catch((e) =>{
          done(e);
        });
      });
    });

    it('should return 404 when todo not found', (done) => {
      var newObjId = new ObjectID;
      request(app)
      .delete(`/todos/${newObjId}`)
      .expect(404)
      .end(done);
    });

    it('should return 404 when ObjectId not valid', (done) => {
      request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
    });
  });

describe('PATCH /todos/id', () => {
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = "New Text";
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed : true,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      expect(typeof(res.body.todo.completedAt)).toBe("number");
    })
    .end(done);
  });

  it('should clear comepletedAt when completed is false', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = "New Text";
    request(app)
    .patch(`/todos/${hexId}`)
    .send({
      completed : false,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBeNull();
    })
    .end(done);
  });
});
