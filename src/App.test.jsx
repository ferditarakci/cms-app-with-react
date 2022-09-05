import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

it('add article test', () => {
	render(<App />)
	const createJobName = screen.getByTestId("createJobName")
	const createJobPriority = screen.getByTestId("createJobPriority")
	const createFormSubmit = screen.getByTestId("createFormSubmit")

	expect(createJobName.value).toBe('')
	fireEvent.change(createJobName, {target: {value: 'Test Job Title'}})

	fireEvent.change(createJobPriority, {target: {value: 2}})

	fireEvent.submit(createFormSubmit)
})

it('add user test', () => {
	render(<App />)
	const filterName = screen.getByTestId("filterName")
	const filterPriority = screen.getByTestId("filterPriority")

	expect(filterName.value).toBe('')
	fireEvent.change(filterName, {target: {value: 'Test Job Title'}})

	fireEvent.change(filterPriority, {target: {value: 3}})
})

it("render find 'Create New Job' title", () => {
	render(<App />)
	const element = screen.getByText(/Create New Job/i)
	expect(element).toBeInTheDocument()
})
