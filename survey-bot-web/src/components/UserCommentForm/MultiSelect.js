import React, { useState, useRef, useEffect } from 'react';
import './MultiSelect.css';

const MultiSelect = ({ options, selectedValues, onChange, placeholder = "Select options..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedValues.includes(option)
  );

  const handleSelect = (option) => {
    const newSelected = [...selectedValues, option];
    onChange(newSelected);
    setSearchTerm('');
    setIsOpen(false); // Close dropdown after selection
  };

  const handleRemove = (option, e) => {
    e.stopPropagation();
    const newSelected = selectedValues.filter(item => item !== option);
    onChange(newSelected);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && searchTerm === '' && selectedValues.length > 0) {
      // Remove last selected item on backspace when input is empty
      const newSelected = selectedValues.slice(0, -1);
      onChange(newSelected);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  return (
    <div className="multi-select-container" ref={containerRef}>
      <div 
        className={`multi-select-input ${isOpen ? 'focused' : ''}`}
        onClick={() => {
          setIsOpen(true);
          inputRef.current?.focus();
        }}
      >
        {selectedValues.length > 0 && (
          <div className="selected-tags-wrapper">
            {selectedValues.map((value, index) => (
              <span key={index} className="selected-tag">
                {value}
                <button
                  type="button"
                  className="remove-tag-btn"
                  onClick={(e) => handleRemove(value, e)}
                  aria-label="Remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          className="multi-select-search"
          placeholder={selectedValues.length === 0 ? placeholder : ''}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
        />
      </div>
      {isOpen && (
        <div className="multi-select-dropdown">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="multi-select-option"
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="multi-select-no-results">
              {searchTerm ? 'No options found' : 'All options selected'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;

