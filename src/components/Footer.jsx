export default function Footer() {
  let currYear = new Date().getFullYear();
  let createdYear = 2024;

  return (
    <div className="text-center border-t-4 border-zinc-400 bg-white/15 p-3">
      &copy; Steven Müller {createdYear === currYear ? createdYear : createdYear - currYear}
    </div>
  );
}
