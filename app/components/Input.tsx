
const Input = () => {
  return (
    <div className="relative">
      <input placeholder="搜索" className="w-64 h-8 focus:shadow-lg border-none  border-gray-300 px-5 py-3 rounded-full w-56 transition-all  outline-none" name="search" type="text" />
      <svg className="size-6 absolute top-1 right-3 text-gray-500 cursor-pointer" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default Input;
