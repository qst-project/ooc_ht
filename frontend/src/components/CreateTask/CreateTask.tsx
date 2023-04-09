interface CreateTaskProps {
    modeCreateTask: boolean;
    setModeCreateTask: Function;
}

function CreateTask({
    modeCreateTask,
    setModeCreateTask,
}: CreateTaskProps) {
    return (
        <span
            onClick={() => setModeCreateTask(!modeCreateTask)}
        >
            Создать задачу
        </span>
    );
}

export default CreateTask;