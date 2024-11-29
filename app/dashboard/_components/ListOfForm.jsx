import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { db } from '../../../configs';
import { jsonForms } from '../../../configs/schema';
import { desc, eq } from 'drizzle-orm';
import FormListItems from '../_components/FormListItems';

export default function ListOfForm() {
  const [formList, setFormList] = useState([]);
  const { user, isLoaded } = useUser();

  const getFormList = async (email) => {
    if (!email) return;
    try {
      const result = await db
        .select()
        .from(jsonForms)
        .where(eq(jsonForms.createdBy, email))
        .orderBy(desc(jsonForms.id));
      if (result) setFormList(result);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      getFormList(user.primaryEmailAddress.emailAddress);
    }
  }, [isLoaded, user]);

  const refreshData = () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      getFormList(user.primaryEmailAddress.emailAddress);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
      {formList.map((form) => (
        <FormListItems key={form.id} form={form} refreshData={refreshData} />
      ))}
    </div>
  );
}
