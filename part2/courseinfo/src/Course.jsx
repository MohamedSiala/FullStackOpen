const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <b>Total of {sum} exercises</b>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

const Course = ({ course }) => {
  const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </div>
  );
};

export default Course;
