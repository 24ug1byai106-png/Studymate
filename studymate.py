import streamlit as st
import pdfplumber
import google.generativeai as genai
import os
import time
import google.api_core.exceptions

def safe_generate(model, prompt, max_retries=3):
    """Generate content safely with exponential backoff if quota is exceeded."""
    for attempt in range(max_retries):
        try:
            response = model.generate_content(prompt)
            return response.text
        except google.api_core.exceptions.ResourceExhausted as e:
            wait_time = 5 * (attempt + 1)  # 5s, 10s, 15s...
            print(f"⚠️ Quota exceeded, retrying in {wait_time}s...")
            time.sleep(wait_time)
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            break
    return "Error: Could not get response due to quota or network issues."

# ----------------------------
# 1. Google Gemini Setup
# ----------------------------
# Get your Gemini API key from https://makersuite.google.com/app/apikey
os.environ["GOOGLE_API_KEY"] = "AIzaSyAs_gQHCCDK_bA2YbUb50uRHy9LnAmaEsg"
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

model = genai.GenerativeModel("gemini-2.5-flash-lite")

# ----------------------------
# 2. Streamlit UI
# ----------------------------
st.set_page_config(page_title="StudyMate - AI Learning Assistant", layout="wide")

st.title("📘 StudyMate - Your AI Learning Assistant")
st.write("Upload your study materials (PDF), and let AI summarize, explain, and quiz you!")

uploaded_file = st.file_uploader("📂 Upload your PDF", type=["pdf"])

# ----------------------------
# 3. Extract Text
# ----------------------------
def extract_text_from_pdf(pdf_file):
    text = ""
    with pdfplumber.open(pdf_file) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text[:10000]  # limit to avoid token overflow

# ----------------------------
# 4. AI Functions
# ----------------------------
def generate_summary(text):
    prompt = f"Summarize the following text into clear, concise notes:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text

def explain_concepts(text):
    prompt = f"Explain the following content in simple language for easy understanding:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text

def generate_quiz(text):
    prompt = f"Create 5 multiple-choice questions with 4 options each and indicate the correct answer based on:\n\n{text}"
    response = model.generate_content(prompt)
    return response.text

# ----------------------------
# 5. Process PDF
# ----------------------------
if uploaded_file is not None:
    with st.spinner("Extracting text and analyzing... ⏳"):
        text = extract_text_from_pdf(uploaded_file)

    st.success("✅ PDF uploaded and processed!")

    # Tabs for better UX
    tab1, tab2, tab3 = st.tabs(["📝 Summary", "📘 Explanation", "❓ Quiz"])

    with tab1:
        if st.button("Generate Summary"):
            summary = generate_summary(text)
            st.subheader("📄 Summary:")
            st.write(summary)

    with tab2:
        if st.button("Explain Concepts"):
            explanation = explain_concepts(text)
            st.subheader("💡 Simplified Explanation:")
            st.write(explanation)

    with tab3:
        if st.button("Generate Quiz"):
            quiz = generate_quiz(text)
            st.subheader("🧩 Practice Quiz:")
            st.write(quiz)

else:
    st.info("👆 Please upload a PDF to begin.")
