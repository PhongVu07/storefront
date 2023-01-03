import React, { useEffect, useState, useMemo } from "react";

import Select from "components/Select";
import Input from "components/Input";
import { getAllUsers } from "api";
import { SelectOption, User } from "types";

interface IProps {
  userData?: User;
  setUserData: (user?: User) => void;
  downloadDesign: () => void;
}

const CardInfoSection: React.FC<IProps> = ({
  userData,
  setUserData,
  downloadDesign,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const userOptions: SelectOption[] = useMemo(() => {
    return (users || [])
      .map((user) => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id,
      }))
  }, [users]);
  const selectedUserOption = useMemo(() => {
    return (userOptions || []).find((user) => user.value === userData?.id);
  }, [users, userData]);

  const handleGetUsers = async () => {
    const fetchedUSers = await getAllUsers();
    setUsers(fetchedUSers);
  };

  const handleSelectUser = (selected: any) => {
    const selectedUser = users.find((user) => user.id === selected);
    setUserData(selectedUser);
  };

  const handleChangeUserData = (data: string, dataType: string) => {
    const updatedUserData = {
      ...userData,
      [dataType]: data,
    } as User;
    setUserData(updatedUserData);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  return (
    <>
      <div className="sm:flex-col1">
        <Select
          options={userOptions}
          label="Select User"
          className="max-w-[49%]"
          selected={selectedUserOption}
          onChange={handleSelectUser}
        />
      </div>
      <div className="sm:flex-col1 mt-6 flex justify-between">
        <Input
          label="First Name"
          name="firstName"
          value={userData?.firstName}
          className="max-w-[49%] flex-1"
          onChange={handleChangeUserData}
        />
        <Input
          label="Last Name"
          name="lastName"
          value={userData?.lastName}
          className="max-w-[49%] flex-1"
          onChange={handleChangeUserData}
        />
      </div>
      <div className="sm:flex-col1 mt-6 flex justify-between">
        <Input
          label="Title"
          name="title"
          value={userData?.title}
          className="max-w-[49%] flex-1"
          onChange={handleChangeUserData}
        />
        <Input
          label="Company"
          name="company"
          value={userData?.company}
          className="max-w-[49%] flex-1"
          onChange={handleChangeUserData}
        />
      </div>
      <div className="sm:flex-col1 mt-6 flex justify-between">
        <Input
          label="Image"
          name="image"
          value={userData?.image}
          className="flex-1"
          onChange={handleChangeUserData}
        />
      </div>
      <div className="sm:flex-col1 mt-6 flex justify-between">
        <button
          onClick={downloadDesign}
          type="button"
          className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-50 py-3 px-8 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Download Design
        </button>
      </div>
    </>
  );
};

export default CardInfoSection;
