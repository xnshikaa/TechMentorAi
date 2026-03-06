# test_import.py
print("Testing imports...")

try:
    from data.projects_data import PROJECTS_DATA, get_project_by_id, get_all_projects
    print(f"✅ Imported projects_data successfully")
    print(f"✅ Total projects: {len(PROJECTS_DATA)}")
    print(f"✅ Project IDs: {list(PROJECTS_DATA.keys())}")
    
    # Test getting a project
    project = get_project_by_id("fe_1")
    if project:
        print(f"✅ fe_1 project found: {project['name']}")
    else:
        print("❌ fe_1 project NOT found")
        
except Exception as e:
    print(f"❌ Import error: {e}")
    import traceback
    traceback.print_exc()