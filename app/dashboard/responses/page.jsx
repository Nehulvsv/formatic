"use client"
import React, { useEffect, useState } from 'react'
import { db } from '../../../configs'
import { jsonForms, userResponses } from '../../../configs/schema'
import { count, eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import FormListItemRespo from './_components/FormListItemRespo'

export default function Page() {
  const { user } = useUser()
  const [listForm, setListForm] = useState([])
  const [formCounts, setFormCounts] = useState({}) // Object to store form counts

  useEffect(() => {
    if (user) {
      fetchFormsAndCounts() // Combined function
    }
  }, [user])

  const fetchFormsAndCounts = async () => {
    if (!user) return

    // Fetch forms created by the user
    const forms = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.createdBy, user?.primaryEmailAddress.emailAddress))

    const counts = {}

    // Fetch response counts for all forms
    for (const form of forms) {
      const result = await db
        .select({ value: count() })
        .from(userResponses)
        .where(eq(userResponses.formRef, form.id))

      counts[form.id] = result[0]?.value || 0 // Assign count to the form ID
    }

    setListForm(forms) // Set the form list
    setFormCounts(counts) // Set the counts
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl flex items-center justify-between">Responses</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
        {listForm.map((form, i) => (
          <FormListItemRespo
            form={form}
            count={formCounts[form.id] || 0} // Pass count for each form
            key={i}
          />
        ))}
      </div>
    </div>
  )
}
