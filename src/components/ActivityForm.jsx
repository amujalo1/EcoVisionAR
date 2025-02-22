import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";

const ActivityForm = ({ activity, onSubmit, onClose, isOpen }) => {
  const [minutes, setMinutes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (minutes && !isNaN(minutes)) {
      onSubmit(activity, Number(minutes));
      setMinutes("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-200 p-12 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="capitalize">{activity} Activity</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="minutes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter Minutes
            </label>
            <input
              id="minutes"
              type="number"
              min="1"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter minutes"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Minutes
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityForm;
