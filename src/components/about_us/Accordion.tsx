import { useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';

const Accordion = (props: { title: string; content: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 w.full relative rounded-lg bg-[#1c202d] border border-solid border-[#333b54]">
      <div
        className="flex justify-between px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="mt-2">{props.title}</div>
        <span className="flex items-center m-0 mt-4 text-4xl">
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </span>
      </div>
      {
        <div
          className={clsx(
            'text-xl flex flex-wrap flex-grow overflow-hidden transition-all duration-500 ease-in-out',
            isOpen ? 'h-64 ' : 'h-0 ',
          )}
        >
          {' '}
          {props.content.map((element) => {
            return (
              <div key={element} className="w-1/2 p-3">
                {element}
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default Accordion;
