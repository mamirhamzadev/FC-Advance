/* eslint-disable camelcase */
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { useRef } from "react";

const TextEditor = (props) => {
	const editorRef = useRef(null);
	const [isLoading, setIsLoading] = useState(true);

	const filePickerCallback = (callback, value, meta) => {
		if (meta.filetype === "image") {
			const input = document.createElement("input");
			input.setAttribute("type", "file");
			input.setAttribute("accept", "image/*");
			input.onchange = function () {
				const file = this.files[0];
				const reader = new FileReader();
				reader.onload = function () {
					callback(reader.result, { alt: file.name });
				};
				reader.readAsDataURL(file);
			};
			input.click();
		}
	};

	return (
		<>
			{isLoading && <div>Loading Text Editor...</div>}
			<Editor
				tinymceScriptSrc="/tinymce/tinymce.min.js"
				onInit={(evt, editor) => {
					editorRef.current = editor;
					setIsLoading(false);  
				}}
				init={{
					promotion: false,
					branding: false,
					height: props?.height || 300,
					menubar: "file edit view insert format tools table help",
					plugins:
						"preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion",
					toolbar:
						"undo redo | bold italic underline strikethrough | align numlist bullist | blocks fontfamily fontsize | link image | table media | lineheight outdent indent | forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl | accordion accordionremove",
					autosave_ask_before_unload: true,
					autosave_interval: "30s",
					autosave_prefix: "{path}{query}-{id}-",
					autosave_restore_when_empty: false,
					autosave_retention: "2m",
					image_advtab: true,
					link_list: [
						{ title: "My page 1", value: "https://www.tiny.cloud" },
						{ title: "My page 2", value: "http://www.moxiecode.com" },
					],
					image_list: [
						{ title: "My page 1", value: "https://www.tiny.cloud" },
						{ title: "My page 2", value: "http://www.moxiecode.com" },
					],
					image_class_list: [
						{ title: "None", value: "" },
						{ title: "Some class", value: "class-name" },
					],
					importcss_append: true,
					file_picker_callback: filePickerCallback,
					templates: [
						{
							title: "New Table",
							description: "creates a new table",
							content:
								'<div class="mceTmpl"><table width="98%" border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
						},
						{ title: "Starting my story", description: "A cure for writers block", content: "Once upon a time..." },
						{
							title: "New list with dates",
							description: "New List with dates",
							content:
								'<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
						},
					],
					template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
					template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
					image_caption: true,
					quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
					noneditable_class: "mceNonEditable",
					toolbar_mode: "sliding",
					contextmenu: "link image table",
					skin: "oxide", // Replace with 'oxide-dark' if using dark mode
					content_css: "default", // Replace with 'dark' if using dark mode
					content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
					// Additional configurations can be added here
				}}
				value={props?.value || ""}
				onEditorChange={props?.setValue}
			/>
		</>
	);
};

export default TextEditor;
