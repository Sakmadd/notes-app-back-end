const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request,h) => {
    const { title,tags,body } = request.payload;
    const id = nanoid(16);
    const createdAt = new Date().toString()
    const updateAt = createdAt
    console.log(createdAt)


    const newNote = {
        title,tags,body,id,createdAt,updateAt
    }

    notes.push(newNote);

    const isSucces = notes.filter((note) => note.id === id).length > 0;

    if(isSucces){
        const response = h.response({
            status: 'succes',
            message: 'Buku Berhasil Di Tambahkan!',
            data: {
                noteId : id,
            }
        })
    response.code(201)
    return response;
    }
    const response = h.response({
        status: 'failed',
        message: 'Buku Gagal Ditambahkan!'

    })
    response.code(500)
    return response;
}

const getAllNotesHandler = () => ({
    status: 'success',
    data: {
      notes,
    }
  })

const getNoteByIdHandler = (request,h) => {
    const { id } = request.params;
    const note = notes.filter((n) => n.id === id)[0]

    if(note !== undefined){
        return {
            status: 'succes',
            data: {
                note,
            }
        }
    }
    const response = h.response({
        status: 'failed',
        message: 'Catatan Tidak Ditemukan',
    })
    response.code(404)
    return response

} 

const editNotedByIdHandler = (request,h) => {
    const { id } = request.params
    const {title,tags,body} = request.payload

    const updateAt = new Date().toISOString()

    const index = notes.findIndex((note) => note.id === id)

    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updateAt,
        }
        const response = h.response({
            status: 'succes',
            message: 'Buku Telah Di Perbarui!'
        })
        response.code(200)
        return response
    }


    const response = h.response({
        status: 'failed',
        message: 'Buku Gagal Di Perbarui!'
    })
    response.code(404)
    return response
}
const deleteNoteByIdHandler = (request,h) => {
    const { id } = request.params
    const index = notes.findIndex((n) => n.id === id)

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil dihapus',
        });
        response.code(200);
        return response;
      }const response = h.response({
        status: 'fail',
        message: 'Catatan gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
}        

module.exports = { addNoteHandler,getAllNotesHandler,getNoteByIdHandler,editNotedByIdHandler,deleteNoteByIdHandler };