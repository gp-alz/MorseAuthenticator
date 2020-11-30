const express = require("express");
const router = express.Router();

// Controller
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote
} = require("../controllers/notes.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Task
router.get("/notes/add", isAuthenticated, renderNoteForm);

router.post("/notes/new-note", isAuthenticated, createNewNote);

// Get All Tasks
router.get("/notes", isAuthenticated, renderNotes);

// Edit Task
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);

// Update Task
router.put("/notes/edit-note/:id", isAuthenticated, updateNote);

// Delete Task
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
