App.NotesController = Ember.ArrayController.extend({
  needs: ['notesNote'],
  newNoteName: null,
  selectedNoteBinding: 'controllers.notesNote.model',

  actions: {
    createNewNote: function(){
      var content = this.get('content'),
          newNoteName = this.get('newNoteName'),
          unique = newNoteName != null && newNoteName.length >= 2;

      content.forEach(function(note){
        if (newNoteName === note.get('name')) {
          unique = false; return;
        }
      });

      if (unique) {
        var newNote = this.store.createRecord('note');
        newNote.set('id', newNoteName);
        newNote.set('name', newNoteName);
        newNote.save();

        this.set('newNoteName', null);
      } else {
        alert('Note must have unique name of at least 2 chars!');
      }
    },
    doDeleteNote: function(note){
      this.set('noteForDeletion', note);
      $("#confirmDeleteNoteDialog").modal({"show": true});
    },
    doCancelDelete: function(){
      this.set('noteForDeletion', null);
      $("#confirmDeleteNoteDialog").modal('hide');
    },
    doConfirmDelete: function(){
      var selectedNote = this.get('noteForDeletion');
      this.set('noteForDeletion', null);
      if (selectedNote) {
        this.store.deleteRecord(selectedNote);
        selectedNote.save();
        if (this.get('controllers.notesNote.model.id') === selectedNote.get('id')) {
          this.transitionToRoute('notes');
        }
      }
      $('#confirmDeleteNoteDialog').modal('hide');
    }
  }
});

