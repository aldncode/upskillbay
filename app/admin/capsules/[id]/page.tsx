'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CapsuleEditor() {
  const params = useParams();
  const [capsule, setCapsule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskInstructions, setNewTaskInstructions] = useState('');
  const [newTaskType, setNewTaskType] = useState('text');
  const [creatingTask, setCreatingTask] = useState(false);

  const capsuleId = params?.id as string;

  useEffect(() => {
    const fetchCapsule = async () => {
      try {
        const res = await fetch(`/api/capsules/${capsuleId}`);
        const data = await res.json();
        setCapsule(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        toast.error('Failed to load capsule');
      } finally {
        setLoading(false);
      }
    };

    if (capsuleId) {
      fetchCapsule();
    }
  }, [capsuleId]);

  const handleUpdate = async () => {
    setEditing(true);
    try {
      const res = await fetch(`/api/capsules/${capsuleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        toast.success('Capsule updated!');
      } else {
        toast.error('Failed to update capsule');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setEditing(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingTask(true);

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          capsuleId,
          title: newTaskTitle,
          instructions: newTaskInstructions,
          submissionType: newTaskType,
        }),
      });

      if (res.ok) {
        toast.success('Task created!');
        setNewTaskTitle('');
        setNewTaskInstructions('');
        setNewTaskType('text');

        // Refetch capsule
        const capsuleRes = await fetch(`/api/capsules/${capsuleId}`);
        const data = await capsuleRes.json();
        setCapsule(data);
      } else {
        toast.error('Failed to create task');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setCreatingTask(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!capsule) {
    return <div className="p-8 text-center">Capsule not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/admin/capsules" className="text-primary hover:underline mb-4 inline-block">
        ← Back to Capsules
      </Link>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Edit Capsule */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Edit Capsule</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input min-h-24"
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={editing}
                className="btn btn-primary"
              >
                {editing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Tasks ({capsule.tasks?.length || 0})</h3>
            {capsule.tasks && capsule.tasks.length > 0 ? (
              <div className="space-y-3">
                {capsule.tasks.map((task: any, idx: number) => (
                  <div key={task.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{idx + 1}. {task.title}</p>
                        <p className="text-sm text-gray-600">
                          Type: {task.submissionType}
                        </p>
                      </div>
                      <Link href={`/admin/tasks/${task.id}`} className="text-primary text-sm">
                        Edit →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No tasks yet</p>
            )}
          </div>
        </div>

        {/* Create Task */}
        <div>
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Add Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="input"
                  placeholder="Task title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Instructions</label>
                <textarea
                  value={newTaskInstructions}
                  onChange={(e) => setNewTaskInstructions(e.target.value)}
                  className="input min-h-20"
                  placeholder="Task instructions"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  value={newTaskType}
                  onChange={(e) => setNewTaskType(e.target.value)}
                  className="input"
                >
                  <option value="text">Text</option>
                  <option value="file">File</option>
                  <option value="link">Link</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={creatingTask}
                className="btn btn-secondary w-full"
              >
                {creatingTask ? 'Creating...' : 'Add Task'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
