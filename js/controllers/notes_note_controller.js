App.NotesNoteController = Ember.ObjectController.extend({
  actions: {
    updateNote: function(){
      var content = this.get('content');
      if (content) {
        content.save();
      }
    }
  }
});
